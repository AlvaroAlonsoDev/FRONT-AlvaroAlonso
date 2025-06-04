import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

export function MainHeader() {
    const navigate = useNavigate();
    // comprueba si estamos en /post/create
    const isCreatePostPage = window.location.pathname === "/post/create";
    // const { user } = useAuth();

    return (
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
            <div className="max-w-2xl mx-auto flex items-center justify-between px-4 h-14">
                {/* Avatar/Logo */}
                <button
                    onClick={() => navigate("/profile")}
                    className="mr-2"
                    aria-label="Mi perfil"
                >
                    <img
                        src="https://cdn-icons-png.freepik.com/256/9347/9347582.png"
                        alt="Tu perfil"
                        className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    />
                </button>

                {/* Nombre de la app centrado o espacio */}
                {/* <div className="flex-1 flex items-center justify-center">
                    <span className="font-extrabold text-xl text-blue-700 tracking-tight select-none">
                        {user?.displayName || "Mi App"}
                    </span>
                </div> */}

                {/* Acciones derecha */}
                <div className="flex items-center gap-2">
                    {!isCreatePostPage && (
                        <Link
                            to="/post/create"
                            className="p-2 bg-blue-300 text-white hover:bg-blue-400 rounded-full transition shadow"
                            aria-label="Nuevo post"
                        >
                            <Plus size={16} color="blue" />
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
