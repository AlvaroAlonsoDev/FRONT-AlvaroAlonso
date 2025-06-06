import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // O Next.js: 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center transition-colors duration-300">
            <motion.div
                className="flex flex-col items-center px-4 py-8 max-w-lg w-full  bg-white/80 backdrop-blur-md"
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Minimalista, vector como emoji o SVG */}
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
                    aria-label="404 Emoji"
                    className="text-7xl md:text-8xl select-none mb-4"
                >
                    🚀
                </motion.div>
                <h1 className="font-semibold text-zinc-800 text-5xl md:text-6xl text-center tracking-tight mb-4 leading-tight select-none">
                    404
                </h1>
                <p className="text-zinc-600 text-lg md:text-xl text-center mb-8 font-light">
                    Ups… No hemos encontrado lo que buscas.<br />
                    Pero sí tenemos estilo.
                </p>
                <Link
                    to="/"
                    className="inline-block px-6 py-3 rounded-xl font-semibold text-base bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Volver al inicio
                </Link>
            </motion.div>
        </div>
    );
}
