import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useClickOutside } from "../hook/useClickOutside";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    const { logout } = useAuth();
    const navigate = useNavigate();

    // @ts-ignore
    useClickOutside(btnRef, () => setTimeout(setOpen(false), btnRef), [0]);

    // Cierra con ESC
    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open]);

    // Navegación accesible
    useEffect(() => {
        if (!open || !menuRef.current) return;
        const items = menuRef.current.querySelectorAll<HTMLButtonElement>("button[data-menuitem]");
        if (items.length > 0) items[0].focus();

        const handleKey = (e: KeyboardEvent) => {
            const focused = document.activeElement;
            if (!menuRef.current?.contains(focused)) return;
            const idx = Array.from(items).indexOf(focused as HTMLButtonElement);
            if (e.key === "ArrowDown") {
                e.preventDefault();
                items[(idx + 1) % items.length].focus();
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                items[(idx - 1 + items.length) % items.length].focus();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [open]);

    return (
        <div className="relative inline-block h-full ">
            <button
                ref={btnRef}
                aria-haspopup="menu"
                aria-expanded={open}
                className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition"
                onClick={() => setOpen((v) => !v)}
                aria-label="Opciones de perfil"
            >
                {/* Icono de 3 puntos verticales (SVG propio) */}
                <svg width={22} height={22} fill="none" viewBox="0 0 24 24">
                    <circle cx={12} cy={5} r={1.5} fill="currentColor" />
                    <circle cx={12} cy={12} r={1.5} fill="currentColor" />
                    <circle cx={12} cy={19} r={1.5} fill="currentColor" />
                </svg>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={menuRef}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 min-w-[180px] bg-white border border-gray-200 rounded-xl shadow-xl z-30"
                        tabIndex={-1}
                        role="menu"
                        aria-label="Opciones de perfil"
                    >
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 outline-none transition rounded-t-xl"
                            data-menuitem
                            role="menuitem"
                            onClick={() => {
                                setOpen(false);
                                navigate("/profile/edit");
                            }}
                        >
                            Editar perfil
                        </button>
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 outline-none transition rounded-b-xl text-red-600"
                            data-menuitem
                            role="menuitem"
                            onClick={() => {
                                setOpen(false);
                                logout()
                            }}
                        >
                            Cerrar sesión
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileMenu;
