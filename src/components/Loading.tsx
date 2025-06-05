import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon } from "lucide-react";

// Mensajes motivacionales que cambian cada 6s
function DynamicMotivationalMessage() {
    const messages = [
        "A veces lo bueno tarda un poquito más ✨",
        "Recargando buenas vibras…",
        "¡Casi, casi, no te vayas! 🚀",
        "La paciencia también suma puntos 😉",
        "Estamos preparando tu mejor experiencia…",
        "Deja que la magia suceda… ⭐️",
        "Nos tomamos nuestro tiempo para hacerlo genial 😎",
        "¿Sabías que esperar también es parte del viaje? 🛤️",
        "Respira hondo… ¡ya casi llegamos! 🌬️",
        "Un poco de paciencia = muchos buenos momentos 🔥",
        "¡Preparando las mejores conexiones para ti! 🌐",
        "Tu comunidad está a punto de crecer 💙",
        "Cargando buenas energías… 🔋",
        "¡Esto valdrá la pena! Confía 😉",
        "¡Listos para brillar juntos! ✨",
        "Reuniendo opiniones auténticas…",
        "¡No te muevas! Algo increíble está por pasar 🚦",
        "¿Tú también sientes la emoción? Nosotros sí 😁",
        "¡Aguanta un pelín más, porfa! 🙏",
        "¿Sabías que cada estrella es única? La tuya también ⭐️",
        "¡MeetBack está calentando motores! 🏁",
        "A veces, el mejor scroll empieza con una espera 😏",
        "¿Un mini break para pensar en algo bonito? 🌈",
        "Tu momento está por comenzar… ⏳",
        "Cargando comunidad, cargando confianza…",
    ];

    const [index, setIndex] = React.useState(0);

    useEffect(() => {
        const interval = setInterval(() => setIndex(i => (i + 1) % messages.length), 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.p
                key={index}
                className="text-[#8ecfff] text-lg mt-1 mb-6 min-h-[2.5rem] text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
            >
                {messages[index]}
            </motion.p>
        </AnimatePresence>
    );
}

const steps = [
    {
        title: "Cargando...",
        showMotivation: false,
        bar: 33
    },
    {
        title: "Estamos preparando todo para ti…",
        showMotivation: false,
        bar: 50
    },
    {
        title: "Parece que estamos reiniciando el servidor…",
        showMotivation: true,
        bar: 66
    }
];

export default function Loading() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStep(1), 5000),
            setTimeout(() => setStep(2), 10000),
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-dvh" aria-busy="true" aria-live="polite">
            <motion.div
                className="flex flex-col items-center justify-center p-8 w-full"
                initial={{ opacity: 0, scale: 0.98, y: 32 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0.15, 0.3, 1] }}
            >
                {/* Logo animado */}
                <motion.span
                    className="block text-7xl text-[#2ecbff] mb-6"
                    animate={{
                        rotate: [0, 360],
                        filter: [
                            "drop-shadow(0 0 12px #2ecbff90)",
                            "drop-shadow(0 0 24px #2ecbffb0)",
                            "drop-shadow(0 0 12px #2ecbff90)"
                        ],
                        scale: [1, 1.12, 1]
                    }}
                    transition={{
                        rotate: { repeat: Infinity, duration: 12, ease: "linear" },
                        filter: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
                        scale: { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
                    }}
                >
                    <StarIcon size={64} />
                </motion.span>

                {/* Mensaje principal animado */}
                <AnimatePresence mode="wait">
                    <motion.h2
                        key={step}
                        className="text-blue-900 text-2xl font-semibold mb-2 text-center min-h-[2.5rem]"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                    >
                        {steps[step].title}
                    </motion.h2>
                </AnimatePresence>

                {/* Mensaje motivacional solo en el paso 2 */}
                {steps[step].showMotivation ? (
                    <DynamicMotivationalMessage />
                ) : (
                    <div className="min-h-[2.5rem] mb-6" />
                )}

                {/* Barra de carga con animación de ancho */}
                <>
                    <motion.div
                        className="h-full bg-[#2ecbff] rounded-full"
                        animate={{ width: `${steps[step].bar}%` }}
                        transition={{ duration: 0.8, ease: [0.4, 0.15, 0.3, 1] }}
                    />
                </>
            </motion.div>
        </div >
    );
}
