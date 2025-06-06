import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { MessageCircle } from "lucide-react";

export function MainHeader() {
    const navigate = useNavigate();
    const isFeedPage = window.location.pathname === "/feed";
    const isProfilePage = window.location.pathname === "/profile";
    const isLogsPage = window.location.pathname === "/logs";
    if (isLogsPage) return null;
    const { user } = useAuth();

    return (
        <header className="
                sticky top-0 z-10
                bg-gradient-to-b from-blue-900 to-transparent
                backdrop-blur
                flex items-center justify-between
                px-4 h-14
            ">
            {/* Avatar/Logo */}
            {!isProfilePage ? (
                <button
                    onClick={() => navigate("/profile")}
                    aria-label="Mi perfil"
                >
                    <img
                        src={user?.avatar || "/default-avatar.png"}
                        alt="Tu perfil"
                        className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                </button>
            ) : (
                <button
                    onClick={() => navigate("/")}
                    aria-label="Home"
                    className="text-white font-semibold text-lg"
                >
                    MeetBack
                </button>
            )}

            {/* Acciones derecha */}
            {isFeedPage && (
                <Link
                    to="/post/create?from=/feed"
                    className="p-2"
                    aria-label="Nuevo post"
                >
                    <MessageCircle size={24} color="white" />
                </Link>
            )}
        </header>
    );
}
