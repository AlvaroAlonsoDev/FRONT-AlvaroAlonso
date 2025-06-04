import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "../contexts/AnimationContext";
import type { IconType } from "react-icons";

type AnimatedIconProps = {
    Icon: IconType;
    isActive?: boolean;
};

export function AnimatedIcon({ Icon, isActive }: AnimatedIconProps) {
    const { isAnimating, text } = useAnimation();

    // Si está animando, se aplican estilos más llamativos
    const baseBg = isActive || isAnimating
        ? "bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300"
        : "bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50";

    const shadow = isActive || isAnimating
        ? "shadow-[0_2px_12px_0_rgba(37,99,235,0.12)]"
        : "shadow-[0_1px_4px_0_rgba(37,99,235,0.06)]";

    const border = isActive || isAnimating
        ? "border-blue-100"
        : "border-gray-100";

    const iconColor = isActive || isAnimating ? "#2563eb" : "#60a5fa";
    const iconFilter = isActive || isAnimating
        ? "drop-shadow(0 1px 2px #2563eb55) saturate(1.1)"
        : "grayscale(70%) opacity-70";

    return (
        <span className="focus:outline-none flex flex-col items-center relative">
            {/* Texto animado arriba y sobre el icono */}
            <AnimatePresence>
                {isAnimating && text && (
                    <motion.div
                        key="anim-text"
                        initial={{ opacity: 0, y: -24 }}
                        animate={{ opacity: 1, y: -40 }}
                        exit={{ opacity: 0, y: -24 }}
                        transition={{ duration: 0.3 }}
                        className="
                        absolute top-0 z-20
                        px-4 py-1.5
                        rounded-2xl
                        text-white
                        text-[15px]
                        font-medium
                        shadow-lg
                        pointer-events-none select-none
                        backdrop-blur-md
                        border
                        border-white/30
                        tracking-wide
                        whitespace-nowrap
                    "
                        style={{
                            background: "linear-gradient(90deg, rgba(45,70,210,0.68) 0%, rgba(45,60,100,0.62) 100%)",
                            boxShadow: "0 6px 24px 0 rgba(16, 30, 80, 0.15)",
                            minWidth: 'max-content',
                            WebkitBackdropFilter: 'blur(8px)'
                        }}
                    >
                        {text}
                    </motion.div>

                )}
            </AnimatePresence>
            {/* Icono */}
            <motion.div
                className={`
                    flex items-center justify-center w-14 h-14 rounded-full
                    border-4
                    ${baseBg} ${shadow} ${border}
                `}
                animate={isAnimating ? { scale: [1, 1.05, 1, 1.05, 1] } : { scale: 1 }}
                transition={{
                    duration: 0.8,
                    times: [0, 0.2, 0.5, 0.7, 1],
                    ease: "easeInOut"
                }}
            >
                <Icon
                    size={32}
                    color={iconColor}
                    style={{
                        filter: iconFilter,
                        transition: "all 0.3s"
                    }}
                />
            </motion.div>
        </span>
    );
}
