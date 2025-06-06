import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StarIcon } from "lucide-react";

export function ProfileAvgStar({ avg }: { avg: number | string }) {
    const [animated, setAnimated] = useState(true);

    useEffect(() => {
        setAnimated(true);
    }, [avg]);

    // Para evitar que se buguee si pulsas muchas veces rápido,
    // resetea primero a false antes de animar otra vez.
    const handleClick = () => {
        setAnimated(false);
        setTimeout(() => setAnimated(true), 10);
    };

    return (
        <div
            className="
                flex items-center justify-center
                bg-gradient-to-br from-[#161e27] via-[#253143] to-[#2c3342]
            "
            style={{
                minWidth: 100,
                minHeight: 100,
                boxShadow: "0 8px 32px 0 #25314355, inset 0 2px 18px #141a28aa",
            }}
        >
            <motion.div
                className="relative flex items-center justify-center cursor-pointer"
                animate={animated ? { scale: [1, 1.05, 1, 1.05, 1] } : { scale: 1 }}
                transition={{
                    duration: 1.2,
                    times: [0, 0.18, 0.43, 0.72, 1],
                    ease: "easeInOut"
                }}
                onAnimationComplete={() => setAnimated(false)}
                onClick={handleClick}
                tabIndex={0}
                aria-label="Ver reputación"
            >
                <StarIcon
                    className="absolute w-[84px] h-[84px] text-[#57aaff] drop-shadow-[0_2px_18px_#57aaff55]"
                    fill="#57aaff"
                />
                <span
                    className="
                        relative
                        text-white
                        font-bold
                        text-3xl
                        drop-shadow-[0_2px_6px_rgba(80,170,255,0.55)]
                        select-none
                        pointer-events-none
                        flex items-center justify-center
                    "
                    style={{
                        letterSpacing: "-0.03em",
                        textShadow: "0 1px 8px #57aaffaa, 0 1px 0 #fff7",
                    }}
                >
                    {avg}
                </span>
            </motion.div>
        </div>
    );
}
