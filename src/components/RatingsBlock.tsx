import { StarRatingDisplay } from "./StarRatingDisplay";

type RatingsStats = {
    sincerity: number | null;
    kindness: number | null;
    trust: number | null;
    vibe: number | null;
    responsibility: number | null;
};

export function RatingsBlock({ ratingsStats, text }: { ratingsStats: RatingsStats, text: string }) {
    return (
        <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-4 w-full">
            <div className="font-semibold text-gray-700 mb-1">{text}</div>
            <RatingItem label="Sinceridad" value={ratingsStats?.sincerity} />
            <RatingItem label="Amabilidad" value={ratingsStats?.kindness} />
            <RatingItem label="Confianza" value={ratingsStats?.trust} />
            <RatingItem label="Vibe" value={ratingsStats?.vibe} />
            <RatingItem label="Responsabilidad" value={ratingsStats?.responsibility} />
        </div>
    );
}

function RatingItem({ label, value }: { label: string; value: number | null }) {
    return (
        <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-32">{label}</div>
            <StarRatingDisplay value={value} />
            <span className="ml-2 text-gray-500">{value !== null ? value : "-"}</span>
        </div>
    );
}
