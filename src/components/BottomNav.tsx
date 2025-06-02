import { Link, useLocation } from "react-router-dom";
import {
    Home,
    Star,
    PlusCircle,
    Bell,
    User
} from "lucide-react";

const navItems = [
    {
        label: "Inicio",
        to: "/",
        icon: Home,
    },
    {
        label: "Estrella",
        to: "/featured",
        icon: Star,
    },
    {
        label: "Crear",
        to: "/new",
        icon: PlusCircle,
    },
    {
        label: "Notificaciones",
        to: "/notifications",
        icon: Bell,
    },
    {
        label: "Perfil",
        to: "/profile",
        icon: User,
    },
];

export function BottomNav() {
    const location = useLocation();

    return (
        <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;

                // El central (estrella) y cualquier seleccionado, efecto flotante
                if (isActive) {
                    return (
                        <Link
                            to={item.to}
                            key={item.label}
                            className={`flex flex-col items-center justify-center -mt-6 transition-all duration-200`}
                            aria-label={item.label}
                            style={{ zIndex: isActive ? 10 : 1 }}
                        >
                            <div
                                className={`w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center border-4 border-white shadow-lg transition-all duration-200
                  ${isActive ? "scale-100" : ""}`}
                                style={{
                                    boxShadow: "0 4px 16px #2563eb33",
                                    transform: isActive ? "scale(1.08)" : "none"
                                }}
                            >
                                <Icon size={32} color="white" />
                            </div>
                        </Link>
                    );
                }

                // Los demás, icono pequeño normal
                return (
                    <Link
                        to={item.to}
                        key={item.label}
                        className="flex flex-col items-center justify-center group transition-all duration-200"
                        aria-label={item.label}
                    >
                        <Icon
                            size={28}
                            color="#9ca3af"
                            strokeWidth={2}
                        />
                    </Link>
                );
            })}
        </nav>
    );
}
