import { useState } from "react";
import { SmoothCollapse } from "./SmoothCollapse";
import { UserRound } from "lucide-react";

type Rating = {
    _id: string;
    from: { displayName?: string; handle?: string; avatar?: string };
    ratings: Record<string, number>;
    comment?: string;
    createdAt: string;
};

export function RatingsHistoryList({ ratingsHistory }: { ratingsHistory: Rating[] }) {
    const [showAll, setShowAll] = useState(false);
    if (!ratingsHistory?.length) return null;

    // Separar los primeros 3 y los extras
    const firstThree = ratingsHistory.slice(0, 3);
    const extras = ratingsHistory.slice(3);

    return (
        <div className="mt-3">
            <div className="font-semibold text-gray-700 mb-2">Valoraciones recibidas</div>
            <div className="flex flex-col gap-3">
                {/* Siempre visibles */}
                {firstThree.map((r) => (
                    <RatingCard key={r._id} {...r} />
                ))}

                {/* Animar solo los extras */}
                <SmoothCollapse open={showAll}>
                    <div className="flex flex-col gap-3">
                        {extras.map((r) => (
                            <RatingCard key={r._id} {...r} />
                        ))}
                    </div>
                </SmoothCollapse>
            </div>
            {ratingsHistory.length > 3 && (
                <button
                    className="mt-2 mx-auto block text-blue-600 font-medium text-sm px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-100 transition shadow"
                    onClick={() => setShowAll((v) => !v)}
                >
                    {showAll ? "Ver menos" : "Ver más"}
                </button>
            )}
        </div>
    );
}

// Componente para cada valoración
function RatingCard({ from, ratings, comment, createdAt }: Rating) {
    return (
        <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 transition-shadow hover:shadow-md">
            <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {from?.avatar ? (
                        <img src={from.avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <UserRound size={20} className="text-gray-300" />
                    )}
                </div>
                <div className="font-medium text-gray-800">{from?.displayName || from?.handle}</div>
                <span className="text-xs text-gray-400">{new Date(createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex gap-2 text-xs mb-1 flex-wrap">
                {Object.entries(ratings).map(([k, v]) => (
                    <span key={k} className="bg-blue-100 text-blue-700 rounded px-2 py-0.5">{k}: {v}</span>
                ))}
            </div>
            {comment && <div className="text-gray-600 text-sm">{comment}</div>}
        </div>
    );
}
