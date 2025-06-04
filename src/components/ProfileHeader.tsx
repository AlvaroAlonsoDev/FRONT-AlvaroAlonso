import { useState } from "react";
import { motion } from "framer-motion";
import { UserRound, CheckCircle2, LogOut } from "lucide-react";
import { ProfileExpandable } from "./ProfileExpandable";
import { useAuth } from "../contexts/AuthContext";

export function ProfileHeader({
    avatar,
    displayName,
    handle,
    description,
    email,
    location,
    createdAt,
    followers = 0,
    following = 0,
    verified = true,
    medal = "🥇",
}: {
    avatar?: string;
    displayName: string;
    handle: string;
    description?: string;
    email?: string;
    location?: string;
    createdAt?: string;
    followers?: number;
    following?: number;
    verified?: boolean;
    medal?: string;
}) {
    const [showMore, setShowMore] = useState(false);
    const { logout } = useAuth();

    return (
        <section className="flex flex-col items-center select-none w-full">
            {/* Contenedor principal */}
            <div className="w-full mx-auto rounded-2xl bg-white/70 px-4 flex flex-col items-stretch py-4 relative z-10">
                <div className="flex items-center gap-3 w-full mb-1">
                    <motion.div
                        className="w-16 h-16 min-w-16 min-h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-300"
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.05 }}
                    >
                        {avatar ? (
                            <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
                        ) : (
                            <UserRound size={40} className="text-gray-300" />
                        )}
                    </motion.div>
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-lg text-gray-900 truncate">{displayName}</span>
                            {verified && (
                                <CheckCircle2
                                    size={18}
                                    className="text-blue-500"
                                    aria-label="Verificado"
                                />
                            )}
                            {medal && (
                                <span
                                    title="Medalla"
                                    aria-label="Medalla"
                                    className="ml-1 text-lg"
                                    style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.05))" }}
                                >
                                    {medal}
                                </span>
                            )}
                        </div>
                        <span className="text-blue-500 text-xs truncate">@{handle}</span>
                        <div className="flex items-center gap-5 mt-2">
                            <button className="flex flex-col items-center focus:outline-none group" tabIndex={0}>
                                <span className="font-extrabold text-[17px] text-gray-900 group-hover:text-blue-600 transition" style={{ fontVariantNumeric: "tabular-nums" }}>
                                    {followers}
                                </span>
                                <span className="text-[11px] text-gray-400 font-medium leading-none">Seguidores</span>
                            </button>
                            <button className="flex flex-col items-center focus:outline-none group" tabIndex={0}>
                                <span className="font-extrabold text-[17px] text-gray-900 group-hover:text-blue-600 transition" style={{ fontVariantNumeric: "tabular-nums" }}>
                                    {following}
                                </span>
                                <span className="text-[11px] text-gray-400 font-medium leading-none">Siguiendo</span>
                            </button>
                        </div>
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.93 }}
                        className="p-2 rounded-full hover:bg-red-100 active:bg-red-200 transition"
                        aria-label="Más"
                        onClick={logout}
                    >
                        <LogOut size={20} className="text-gray-600" />
                    </motion.button>
                </div>
            </div>

            {/* Contenedor expandible: pegado, visualmente continuación del de arriba */}
            <ProfileExpandable
                description={description}
                email={email}
                location={location}
                createdAt={createdAt}
                showMore={showMore}
                setShowMore={setShowMore}
            />
        </section>
    );
}
