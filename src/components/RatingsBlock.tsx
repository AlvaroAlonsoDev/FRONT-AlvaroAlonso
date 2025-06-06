import { StarRatingDisplay } from "./StarRatingDisplay";
import { ProfileAvgStar } from "./ProfileAvgStar";
import { Link } from "react-router-dom";

const ASPECTS = [
    { key: "sincerity", label: "Sinceridad" },
    { key: "kindness", label: "Amabilidad" },
    { key: "trust", label: "Confianza" },
    { key: "vibe", label: "Vibe" },
    { key: "responsibility", label: "Responsabilidad" },
];

type RatingsStats = {
    sincerity: number | null;
    kindness: number | null;
    trust: number | null;
    vibe: number | null;
    responsibility: number | null;
};

export function RatingsBlock({
    ratingsStats,
    onShowAllRatings,
}: {
    ratingsStats: RatingsStats;
    onShowAllRatings?: () => void;
}) {
    // Calcula la media global (ignora nulls)
    const values = Object.values(ratingsStats).filter(v => v !== null) as number[];
    const avg = values.length
        ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)
        : "-";

    return (
        <div className="w-full flex flex-col gap-4 border-b pb-2">
            {/* Nota global arriba */}
            <ProfileAvgStar avg={avg} />
            {/* Breakdown de aspectos */}

            <div className="flex flex-col mx-2 gap-2">
                <div className="flex flex-col gap-2">
                    {ASPECTS.map(({ key, label }) => (
                        <RatingAspectRow
                            key={key}
                            label={label}
                            value={ratingsStats[key as keyof RatingsStats]}
                        />
                    ))}
                </div>
                {/* Botón o link */}
                <div className="flex justify-end">
                    <Link
                        to={"/ratings/me?from=/profile"}
                        onClick={onShowAllRatings}
                        className="text-[#267cff] hover:underline font-medium text-sm transition"
                    >
                        Ver todas las valoraciones
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Un solo aspecto: barra, emoji, label, valor, estrellas
function RatingAspectRow({
    label,
    value,
}: {
    label: string;
    value: number | null;
}) {
    return (
        <div className="flex items-center justify-between gap-3">
            {/* Emoji + label */}
            <div className="flex items-center gap-1 w-36 min-w-32 font-medium">
                {label}
            </div>
            {/* Valor y estrellas */}
            <div className="flex items-center gap-2 min-w-[80px] justify-end">
                <StarRatingDisplay value={value} />
            </div>
        </div>
    );
}
