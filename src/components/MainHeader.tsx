import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { MessageCircle } from "lucide-react";

export function MainHeader() {
    const navigate = useNavigate();
    // comprueba si estamos en /post/create
    const isCreatePostPage = window.location.pathname === "/post/create";
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-10 bg-blue-900 backdrop-blur flex items-center justify-between px-4 h-14">
            {/* Avatar/Logo */}
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

            {/* Acciones derecha */}
            {!isCreatePostPage && (
                <Link
                    to="/post/create"
                    className="p-2"
                    aria-label="Nuevo post"
                >
                    <MessageCircle size={24} color="white" />
                </Link>
            )}
        </header>
    );
}
