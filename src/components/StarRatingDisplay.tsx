import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
    value: number | null;
    max?: number;
    size?: number;
};

export function StarRatingDisplay({ value, max = 5, size = 24 }: Props) {
    const val = value ?? 0;
    const [popped, setPopped] = useState<number | null>(null);

    return (
        <div className="flex gap-0.5 items-center">
            {Array.from({ length: max }).map((_, i) => {
                let fillPercent = Math.max(0, Math.min(1, val - i));
                const isFilled = fillPercent === 1;
                const isPartial = fillPercent > 0 && fillPercent < 1;

                return (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: popped === i ? [1, 1.25, 0.94, 1] : 1,
                        }}
                        transition={{
                            opacity: { delay: i * 0.07 },
                            scale: popped === i
                                ? { times: [0, 0.22, 0.6, 1], duration: 0.42, type: "tween", ease: "easeInOut" }
                                : { delay: i * 0.07, type: "spring", stiffness: 250, damping: 20 }
                        }}
                        style={{
                            width: size,
                            height: size,
                            display: "inline-block",
                            position: "relative",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            setPopped(i);
                            setTimeout(() => setPopped(null), 500);
                        }}
                    >
                        {/* Fondo gris siempre */}
                        <svg width={size} height={size} viewBox="0 0 24 24" style={{ position: "absolute", left: 0, top: 0 }}>
                            <polygon
                                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77
                                    5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                                fill="#e5e7eb"
                            />
                        </svg>
                        {(isFilled || isPartial) && (
                            <motion.span
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
                                initial={{ width: 0 }}
                                animate={{ width: `${fillPercent * 100}%` }}
                                transition={{ delay: i * 0.07, type: "tween", duration: 0.25 }}
                            >
                                <motion.svg
                                    width={size}
                                    height={size}
                                    viewBox="0 0 24 24"
                                    // Esto solo para la parte azul (relleno):
                                    animate={{
                                        fill: popped === i ? "#60a5fa" : "#1e90ff", // Azul más claro cuando está popped
                                    }}
                                    transition={{
                                        fill: { duration: 0.26, ease: "easeInOut" }
                                    }}
                                >
                                    <polygon
                                        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77
                                            5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                                    />
                                </motion.svg>
                            </motion.span>
                        )}
                    </motion.span>
                );
            })}
        </div>
    );
}
