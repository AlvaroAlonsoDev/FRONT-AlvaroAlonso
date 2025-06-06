import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ComingSoon({ title = "Próximamente", subtitle = "Estamos trabajando para traerte esta sección muy pronto.", showHome = true }) {
    return (
        <div className="min-h-[80dvh] flex items-center justify-center transition-colors duration-300">
            <motion.div
                className="flex flex-col items-center px-4 py-8 max-w-lg w-full bg-white/80 backdrop-blur-md rounded-2xl"
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Emoji, puedes cambiarlo por otro svg si quieres */}
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
                    aria-label="En construcción"
                    className="text-7xl md:text-8xl select-none mb-4"
                >
                    🛠️
                </motion.div>
                <h1 className="font-semibold text-zinc-800 text-3xl md:text-4xl text-center tracking-tight mb-4 leading-tight select-none">
                    {title}
                </h1>
                <p className="text-zinc-600 text-lg md:text-xl text-center mb-8 font-light">
                    {subtitle}
                </p>
                {showHome && (
                    <Link
                        to="/"
                        className="inline-block px-6 py-3 rounded-xl font-semibold text-base bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Volver al inicio
                    </Link>
                )}
            </motion.div>
        </div>
    );
}
