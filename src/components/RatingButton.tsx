import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon } from "lucide-react";
import { getCloseToMeApi } from "../helpers/api.user";
import { useAuth } from "../contexts/AuthContext";
import { ASPECTS, ASPECTS_EN } from "../utils/constants";
import { Link } from "react-router-dom";
import { useRating } from "../hook/useRating";

const APPEAR_INTERVAL = 1200;  // cada 1.2s aparece 1 usuario más
const LOADER_TIME = 6000;      // animación de "buscando" dura 6s

// --- Tipos internos ---
type User = {
    _id?: string;
    displayName: string;
    handle: string;
    avatar: string;
};

type ModalStep = "closed" | "searching" | "select" | "rate";

const RatingButton: React.FC = () => {
    const { token } = useAuth();
    const { createRate } = useRating();
    const [modal, setModal] = useState<ModalStep>("closed");
    const [query, setQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [ratings, setRatings] = useState<Record<string, number>>({});
    const [visibleUsers, setVisibleUsers] = useState<User[]>([]);
    const [showInput, setShowInput] = useState(false);
    const [comment, setComment] = useState("");

    const appearIndex = useRef(0);
    const appearIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const loaderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const fetchNearbyUsers = async (token: string) => {
        return await getCloseToMeApi(token);
    };

    // --- Paso 1 y 2 agrupados ---
    const handleOpenModal = async () => {
        setModal("searching");
        setShowInput(false);
        setVisibleUsers([]);
        setQuery("");
        appearIndex.current = 0;

        if (!token) return null;

        const found = await fetchNearbyUsers(token);
        const allUsers = found.data || [];


        // Van apareciendo usuarios poco a poco mientras el loader está activo
        function showNextUser() {
            if (appearIndex.current < allUsers.length) {
                const nextUser = allUsers[appearIndex.current];
                if (nextUser) { // solo agrega si el usuario existe
                    setVisibleUsers(users => [...users, nextUser]);
                }
                appearIndex.current += 1;
                if (appearIndex.current < allUsers.length) {
                    appearIntervalRef.current = setTimeout(showNextUser, APPEAR_INTERVAL);
                }
            }
        }

        showNextUser();

        // Después de LOADER_TIME, mostrar el buscador (input)
        loaderTimeoutRef.current = setTimeout(() => {
            setShowInput(true);
            setVisibleUsers(allUsers); // mostrar todos los usuarios al terminar loader
            if (appearIntervalRef.current) clearTimeout(appearIntervalRef.current);
        }, LOADER_TIME);
    };

    const handleCloseModal = () => {
        setModal("closed");
        setQuery("");
        setSelectedUser(null);
        setRatings({});
        setVisibleUsers([]);
        setShowInput(false);
        // Limpiar timeouts
        if (appearIntervalRef.current) clearTimeout(appearIntervalRef.current);
        if (loaderTimeoutRef.current) clearTimeout(loaderTimeoutRef.current);
    };

    const handleBackToSelect = () => {
        setModal("searching");
        setRatings({});
    };

    const handleSetRating = (aspectKey: string, value: number) => {
        setRatings(prev =>
            prev[aspectKey] === value
                ? { ...prev, [aspectKey]: 0 }
                : { ...prev, [aspectKey]: value }
        );
    };

    const ratingsEn = Object.fromEntries(
        Object.entries(ratings)
            .filter(([_, value]) => value > 0)
            .map(([key, value]) => [
                ASPECTS_EN[key as keyof typeof ASPECTS_EN] ?? key,
                value
            ])
    );

    const handleSendRating = async () => {
        if (!selectedUser?._id) {
            alert("No hay usuario seleccionado");
            return;
        }
        try {
            await createRate({
                toUserId: selectedUser._id,
                ratings: ratingsEn,
                comment: comment,
            });
        } catch (err: any) {
            alert(err.message || "Error al enviar valoración");
        }
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
                                {!showInput ? (
                                    <>
                                        {/* Loader animación GRANDE (mientras showInput es false) */}
                                        <motion.span
                                            className="block text-7xl text-[#2563eb] mb-6"
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
                                        <span className="text-xl font-semibold text-gray-800 mb-2 text-center">
                                            Buscando personas cerca de ti…
                                        </span>
                                        <span className="text-gray-500 text-center max-w-xs mb-4">
                                            Analizando tu entorno para encontrar a quienes puedes valorar.
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-xl font-semibold text-gray-800 mb-2 text-center">
                                            Seguimos buscando…
                                        </span>
                                        <div className="flex items-center gap-3 w-full mt-2 mb-3">
                                            {/* Loader animación pequeña */}
                                            <motion.span
                                                className="inline-block text-[#2563eb]"
                                                animate={{
                                                    rotate: [0, 360],
                                                    filter: [
                                                        "drop-shadow(0 0 6px #2ecbff90)",
                                                        "drop-shadow(0 0 12px #2ecbffb0)",
                                                        "drop-shadow(0 0 6px #2ecbff90)"
                                                    ],
                                                    scale: [1, 1.08, 1]
                                                }}
                                                transition={{
                                                    rotate: { repeat: Infinity, duration: 8, ease: "linear" },
                                                    filter: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
                                                    scale: { repeat: Infinity, duration: 1.8, ease: "easeInOut" }
                                                }}
                                            >
                                                <StarIcon size={26} />
                                            </motion.span>
                                            {/* Input de búsqueda */}
                                            <input
                                                type="text"
                                                autoFocus
                                                value={query}
                                                onChange={e => setQuery(e.target.value)}
                                                placeholder="Buscar por nombre o usuario"
                                                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                            />
                                        </div>
                                    </>
                                )}



                                {/* Usuarios van apareciendo mientras loader está activo */}
                                <div className="flex flex-col gap-2 max-h-72 overflow-y-auto w-full">
                                    {visibleUsers.length === 0 ? (
                                        <div className="text-gray-400 text-center py-3 select-none">
                                            <span>No se han encontrado personas aún…</span>
                                        </div>
                                    ) : (
                                        visibleUsers.map(u => (
                                            <button
                                                key={u.handle}
                                                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition"
                                                onClick={() => {
                                                    setSelectedUser(u);
                                                    setModal("rate");
                                                }}
                                                type="button"
                                            >
                                                <img
                                                    src={u.avatar || "/default-avatar.png"}
                                                    className="w-9 h-9 rounded-full border-2 border-blue-100"
                                                    alt={u.displayName}
                                                />
                                                <span className="font-medium text-gray-900 truncate">
                                                    {u.displayName || "Usuario sin nombre"}
                                                </span>
                                                <span className="text-gray-500 text-sm ml-auto truncate">
                                                    @{u.handle || "usuario_sin_handle"}
                                                </span>
                                            </button>
                                        ))
                                    )}
                                </div>
                                {showInput && (
                                    <button
                                        className="mt-2 text-blue-600 hover:underline mx-auto"
                                        onClick={handleCloseModal}
                                        type="button"
                                    >
                                        Cancelar
                                    </button>
                                )}

                            </motion.div>
                        )}

                        {/* Paso 3: Valorar usuario */}
                        {modal === "rate" && selectedUser && (
                            <motion.div
                                key="rate"
                                className="bg-white rounded-2xl px-2 py-8 w-full max-w-sm shadow-xl relative flex flex-col items-center"
                                initial={{ scale: 0.92, y: 60, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0.96, y: 40, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                            >
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
                                <Link to={`/profile/${selectedUser.handle}`} className="flex flex-col items-center">
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
                                </Link>
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

                                {/* Input de comentario */}
                                <div className="w-full mt-6">
                                    <label htmlFor="comment" className="block text-gray-800 font-medium mb-2 text-base">
                                        Comentario (opcional)
                                    </label>
                                    <div
                                        className={`
                                            rounded-2xl border transition-all
                                            ${comment.length > 0
                                                ? "border-blue-500 ring-2 ring-blue-200"
                                                : "border-gray-200"}
                                            bg-gray-50
                                            flex items-center px-3
                                        `}
                                    >
                                        <textarea
                                            id="comment"
                                            rows={3}
                                            maxLength={250}
                                            placeholder="¿Algo que quieras destacar sobre esta persona? (máx. 250 caracteres)"
                                            value={comment}
                                            onChange={e => setComment(e.target.value)}
                                            className="
                                                w-full bg-transparent outline-none resize-none py-2 text-sm
                                                placeholder-gray-400
                                                focus:placeholder-gray-300
                                            "
                                            style={{ minHeight: 56, maxHeight: 90 }}
                                        />
                                    </div>
                                    <div className="flex justify-end text-xs text-gray-400 mt-1 select-none">
                                        {comment.length}/250
                                    </div>
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
