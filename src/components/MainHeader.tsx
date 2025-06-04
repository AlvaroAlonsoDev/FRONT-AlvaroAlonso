import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { MessageCircle } from "lucide-react";

export function MainHeader() {
    const navigate = useNavigate();
    // comprueba si estamos en /post/create
    const isCreatePostPage = window.location.pathname === "/post/create";
    const { user } = useAuth();

    return (
        <header className="bg-blue-900 backdrop-blur shadow-sm">
            <div className="max-w-2xl mx-auto flex items-center justify-between px-4 h-14">
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

                {/* Nombre de la app centrado o espacio */}
                {/* <div className="flex-1 flex items-center justify-center">
                    <span className="font-extrabold text-xl text-blue-700 tracking-tight select-none">
                        {user?.displayName || "Mi App"}
                    </span>
                </div> */}

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
            </div>
        </header>
    );
}
