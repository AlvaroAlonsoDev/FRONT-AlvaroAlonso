import { useEffect, useState } from "react";

type Props = {
    value: number | null;  // Puede ser decimal, como 4.5 o 3.2
    max?: number;
    size?: number;
};

export function StarRatingDisplay({ value, max = 5, size = 24 }: Props) {
    const val = value ?? 0;
    const [visibleStars, setVisibleStars] = useState(0);

    // Animación de "aparecer" una a una
    useEffect(() => {
        setVisibleStars(0);
        const timeout = setTimeout(() => {
            let current = 0;
            const interval = setInterval(() => {
                current++;
                setVisibleStars(current);
                if (current >= max) clearInterval(interval);
            }, 70); // tiempo entre estrellas (ajusta si quieres)
        }, 0);

        return () => {
            clearTimeout(timeout);
            setVisibleStars(max);
        };
    }, [max, value]);

    return (
        <div className="flex gap-0.5 items-center">
            {Array.from({ length: max }).map((_, i) => {
                // Si aún no toca mostrar esta estrella, opacidad 0
                if (i >= visibleStars) {
                    return (
                        <span key={i} style={{ width: size, height: size, opacity: 0, transition: "opacity 0.2s" }}>
                            <svg width={size} height={size} viewBox="0 0 24 24">
                                <polygon
                                    points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77
                                    5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                                    fill="#e5e7eb"
                                />
                            </svg>
                        </span>
                    );
                }

                // Calculo del "porcentaje" de esta estrella (1 = llena, 0.5 = media, etc)
                let fillPercent = Math.max(0, Math.min(1, val - i));

                if (fillPercent === 1) {
                    // Llena
                    return (
                        <span key={i} style={{ width: size, height: size, opacity: 1, transition: "opacity 0.2s" }}>
                            <svg width={size} height={size} viewBox="0 0 24 24">
                                <polygon
                                    points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77
                                    5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                                    fill="#1e90ff"
                                />
                            </svg>
                        </span>
                    );
                } else if (fillPercent > 0) {
                    // Media o decimal
                    // Truco: dos SVGs, uno encima del otro, usando un div con overflow:hidden
                    return (
                        <span
                            key={i}
                            style={{
                                width: size,
                                height: size,
                                display: "inline-block",
                                position: "relative",
                                opacity: 1,
                                transition: "opacity 0.2s"
                            }}
                        >
                            {/* Fondo gris */}
                            <svg width={size} height={size} viewBox="0 0 24 24" style={{ position: "absolute", left: 0, top: 0 }}>
                                <polygon
                                    points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77
                                    5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                                    fill="#e5e7eb"
                                />
                            </svg>
                            {/* Parte azul */}
                            <span
                                style={{
                                    display: "block",
                                    width: `${fillPercent * 100}%`,
                                    height: "100%",
                                    overflow: "hidden",
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    pointerEvents: "none",
                                }}
                            >
                                <svg width={size} height={size} viewBox="0 0 24 24">
                                    <polygon
                                        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77
                                        5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                                        fill="#1e90ff"
                                    />
                                </svg>
                            </span>
                        </span>
                    );
                } else {
                    // Vacía
                    return (
                        <span key={i} style={{ width: size, height: size, opacity: 1, transition: "opacity 0.2s" }}>
                            <svg width={size} height={size} viewBox="0 0 24 24">
                                <polygon
                                    points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77
                                    5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                                    fill="#e5e7eb"
                                />
                            </svg>
                        </span>
                    );
                }
            })}
        </div>
    );
}
