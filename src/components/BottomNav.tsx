import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Star, Bell, User, Trophy } from "lucide-react";
import { AnimatedIcon } from "./AnimatedIcon";

const navItems = [
    { label: "Inicio", to: "/", icon: Home },
    { label: "Ranking", to: "/ranking", icon: Trophy },
    { label: "MeetBack", to: "/meetback", icon: Star },
    { label: "Notificaciones", to: "/notifications", icon: Bell },
    { label: "Perfil", to: "/profile", icon: User },
];

export function BottomNav() {
    const location = useLocation();

    return (
        <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex justify-around items-end h-20 z-50">
            {navItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                const isEstrella = idx === 2;

                return (
                    <Link
                        to={item.to}
                        key={item.label}
                        className="flex flex-col items-center relative group mb-[15px]"
                        aria-label={item.label}
                        tabIndex={0}
                        style={{ minWidth: 60 }}
                    >
                        <motion.div
                            className="flex flex-col items-center"
                            animate={
                                isActive
                                    ? { y: 0, scale: 1 }
                                    : { y: 0, scale: 1 }
                            }
                            transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 26,
                            }}
                            style={{ minHeight: 52, marginBottom: 0 }}
                        >
                            <div className="flex items-center justify-center">
                                {isEstrella ? (
                                    <AnimatedIcon
                                        Icon={Star}
                                        isActive={isActive}
                                    />
                                ) : (
                                    <Icon
                                        size={28}
                                        color={isActive ? "#2563eb" : "#9ca3af"}
                                        strokeWidth={2}
                                    />
                                )}
                            </div>
                            <span
                                className={`${isEstrella ? "" : "mt-1"} text-xs font-medium select-none transition-colors duration-200 ${isActive ? "text-blue-600 font-bold" : "text-gray-500"
                                    }`}
                            >
                                {item.label}
                            </span>
                        </motion.div>
                    </Link>
                );
            })}
        </nav>
    );
}
