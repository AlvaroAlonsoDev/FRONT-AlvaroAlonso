import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon } from "lucide-react";

// --- Tipos internos ---
type User = {
    _id?: string;
    displayName: string;
    handle: string;
    avatar: string;
};

type ModalStep = "closed" | "searching" | "select" | "rate";

// --- Mock fetch users ---
const fetchNearbyUsers = (): Promise<User[]> =>
    new Promise(resolve =>
        setTimeout(
            () =>
                resolve([
                    {
                        displayName: "Laura García",
                        handle: "lauragarcia",
                        avatar:
                            "https://www.clearly.help/_next/image?url=https%3A%2F%2Fd31q7c36psds2j.cloudfront.net%2Fthumbnail%2F80a4f757-a8b8-449f-992a-2445be55c9b8.jpg&w=256&q=75",
                    },
                    {
                        displayName: "Lucas Hernández",
                        handle: "lucasher",
                        avatar:
                            "https://cachedimages.podchaser.com/256x256/aHR0cHM6Ly9zdGF0aWMtMS5pdm9veC5jb20vY2FuYWxlcy82LzkvMC85LzY4NDE0Nzk4MjkwOTZfWFhMLmpwZw%3D%3D/aHR0cHM6Ly93d3cucG9kY2hhc2VyLmNvbS9pbWFnZXMvbWlzc2luZy1pbWFnZS5wbmc%3D",
                    },
                    {
                        displayName: "Carlos Ruiz",
                        handle: "carlitos",
                        avatar:
                            "https://media.nngroup.com/media/people/photos/2022-portrait-page-3.jpg.256x256_q75_autocrop_crop-smart_upscale.jpg",
                    },
                ]),
            1800
        )
    );

// --- Constantes de la valoración ---
const ASPECTS = [
    { key: "sinceridad", label: "Sinceridad" },
    { key: "amabilidad", label: "Amabilidad" },
    { key: "confianza", label: "Confianza" },
    { key: "vibe", label: "Vibe" },
    { key: "responsabilidad", label: "Responsabilidad" },
];

const RatingButton: React.FC = () => {
    // --- State principal ---
    const [modal, setModal] = useState<ModalStep>("closed");
    const [users, setUsers] = useState<User[]>([]);
    const [query, setQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [ratings, setRatings] = useState<Record<string, number>>({});

    // --- Filtros y helpers ---
    const filteredUsers = useMemo(
        () =>
            query
                ? users.filter(
                    u =>
                        u.displayName.toLowerCase().includes(query.toLowerCase()) ||
                        u.handle.toLowerCase().includes(query.toLowerCase())
                )
                : users,
        [query, users]
    );

    // --- Control flujo UI ---
    const handleOpenModal = async () => {
        setModal("searching");
        const found = await fetchNearbyUsers();
        setUsers(found);
        setModal("select");
    };

    const handleCloseModal = () => {
        setModal("closed");
        setQuery("");
        setSelectedUser(null);
        setRatings({});
    };

    const handleSelectUser = (user: User) => {
        setSelectedUser(user);
        setModal("rate");
    };

    const handleBackToSelect = () => {
        setModal("select");
        setRatings({});
    };

    const handleSetRating = (aspectKey: string, value: number) => {
        setRatings(prev =>
            prev[aspectKey] === value
                ? { ...prev, [aspectKey]: 0 }
                : { ...prev, [aspectKey]: value }
        );
    };

    const handleSendRating = () => {
        // Aquí enviaría la valoración al backend
        console.log(
            `Valoraste a ${selectedUser?.displayName}:\n${JSON.stringify(ratings, null, 2)}`
        );
        handleCloseModal();
    };

    // --- Render ---
    return (
        <>
            {/* Botón principal */}
            <motion.button
                className="bg-blue-600 text-white rounded-2xl px-6 py-3 text-lg font-bold shadow-lg relative overflow-hidden"
                whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 6px 24px 0px rgba(0,73,255,0.25)",
                    backgroundColor: "#2563eb",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOpenModal}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
                <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05, duration: 0.3 }}
                >
                    Valorar a alguien que conozco
                </motion.span>
            </motion.button>

            {/* Modal general */}
            <AnimatePresence>
                {modal !== "closed" && (
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Loader: Searching */}
                        {modal === "searching" && (
                            <motion.div
                                key="searching"
                                className="bg-white rounded-2xl px-8 py-10 flex flex-col items-center shadow-xl"
                                initial={{ scale: 0.92, opacity: 0, y: 60 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.96, opacity: 0, y: 40 }}
                                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                            >
                                <motion.div
                                    className="mb-6"
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.2,
                                        ease: "linear",
                                    }}
                                >
                                    <svg className="w-10 h-10 text-blue-500" viewBox="0 0 40 40">
                                        <circle
                                            cx="20"
                                            cy="20"
                                            r="16"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            opacity="0.2"
                                        />
                                        <motion.circle
                                            cx="20"
                                            cy="20"
                                            r="16"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            strokeDasharray="35 95"
                                            strokeDashoffset="0"
                                            initial={{ strokeDashoffset: 95 }}
                                            animate={{ strokeDashoffset: 0 }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 1.2,
                                                ease: "linear",
                                            }}
                                        />
                                    </svg>
                                </motion.div>
                                <span className="text-xl font-semibold text-gray-800 mb-2 text-center">
                                    Buscando personas cerca de ti…
                                </span>
                                <span className="text-gray-500 text-center max-w-xs">
                                    Analizando tu entorno para encontrar a quienes puedes valorar.
                                </span>
                            </motion.div>
                        )}

                        {/* Paso 2: Selección de usuario */}
                        {modal === "select" && (
                            <motion.div
                                key="select"
                                className="bg-white rounded-2xl px-2 py-8 w-full max-w-sm shadow-xl relative flex flex-col"
                                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0.95, y: 40, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                                {/* Botón cerrar */}
                                <button
                                    onClick={handleCloseModal}
                                    className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 transition"
                                    aria-label="Cerrar"
                                    type="button"
                                >
                                    <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
                                    </svg>
                                </button>
                                <div className="mt-4">
                                    <input
                                        type="text"
                                        autoFocus
                                        value={query}
                                        onChange={e => setQuery(e.target.value)}
                                        placeholder="Buscar por nombre o usuario"
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base mb-4"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto custom-scroll">
                                    {filteredUsers.length === 0 ? (
                                        <div className="text-gray-400 text-center py-6 select-none">
                                            <span>No se han encontrado personas cerca.</span>
                                        </div>
                                    ) : (
                                        filteredUsers.map(u => (
                                            <button
                                                key={u.handle}
                                                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition"
                                                onClick={() => handleSelectUser(u)}
                                                type="button"
                                            >
                                                <img
                                                    src={u.avatar}
                                                    className="w-9 h-9 rounded-full border-2 border-blue-100"
                                                    alt={u.displayName}
                                                />
                                                <span className="font-medium text-gray-900">
                                                    {u.displayName}
                                                </span>
                                                <span className="text-gray-500 text-sm ml-auto">
                                                    @{u.handle}
                                                </span>
                                            </button>
                                        ))
                                    )}
                                </div>
                                <button
                                    className="mt-3 text-blue-600 hover:underline mx-auto"
                                    onClick={handleCloseModal}
                                    type="button"
                                >
                                    Cancelar
                                </button>
                            </motion.div>
                        )}

                        {/* Paso 3: Valorar usuario */}
                        {modal === "rate" && selectedUser && (
                            <motion.div
                                key="rate"
                                className="bg-white rounded-2xl px-4 py-8 w-full max-w-sm shadow-xl relative flex flex-col items-center"
                                initial={{ scale: 0.92, y: 60, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0.96, y: 40, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                            >
                                {/* Botón cerrar */}
                                <button
                                    onClick={handleCloseModal}
                                    className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 transition"
                                    aria-label="Cerrar"
                                    type="button"
                                >
                                    <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
                                    </svg>
                                </button>
                                {/* Botón volver */}
                                <button
                                    onClick={handleBackToSelect}
                                    className="absolute top-3 left-3 text-gray-400 hover:text-blue-600 transition flex items-center"
                                    aria-label="Volver"
                                    type="button"
                                >
                                    <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <span className="ml-1 text-sm">Atrás</span>
                                </button>
                                <img
                                    src={selectedUser.avatar}
                                    className="w-16 h-16 rounded-full border-4 border-blue-100 mb-2 shadow"
                                    alt={selectedUser.displayName}
                                />
                                <span className="font-semibold text-lg text-gray-900">
                                    {selectedUser.displayName}
                                </span>
                                <span className="text-gray-500 text-sm mb-4">
                                    @{selectedUser.handle}
                                </span>
                                <div className="w-full mt-2">
                                    {ASPECTS.map(aspect => (
                                        <div
                                            key={aspect.key}
                                            className="flex items-center justify-between my-2"
                                        >
                                            <span className="text-gray-800">{aspect.label}</span>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map(num => (
                                                    <button
                                                        key={num}
                                                        onClick={() => handleSetRating(aspect.key, num)}
                                                        className="focus:outline-none"
                                                        aria-label={`Poner ${num} estrellas`}
                                                        type="button"
                                                    >
                                                        <StarIcon
                                                            size={22}
                                                            className={`transition ${ratings[aspect.key] && ratings[aspect.key] >= num
                                                                ? "fill-blue-600 text-blue-600"
                                                                : "fill-gray-200 text-blue-200"
                                                                }`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl py-3 shadow transition disabled:opacity-50"
                                    disabled={!Object.keys(ratings).length || Object.values(ratings).some(v => v === 0)}
                                    onClick={handleSendRating}
                                    type="button"
                                >
                                    Enviar valoración
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default RatingButton;
