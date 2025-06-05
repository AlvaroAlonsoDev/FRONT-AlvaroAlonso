import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react"; // usa un spinner de lucide o el que prefieras
import { useFollow } from "../hook/useFollow";

interface FollowButtonProps {
    userId: string | undefined;
    initialFollowing?: boolean;
    target: string;
}

export function FollowButton({ userId, initialFollowing, target }: FollowButtonProps) {
    if (userId === target) return null; // No mostrar botón si es el propio usuario
    const { isFollowing, loading, error, follow, unfollow } = useFollow(target, initialFollowing ?? false);
    const [showUnfollow, setShowUnfollow] = useState(false);

    const [reallyInitialStatusFollowing, setReallyInitialStatusFollowing] = useState(false);
    useEffect(() => {
        if (initialFollowing !== undefined) {
            setReallyInitialStatusFollowing(initialFollowing);
        }
    }, [])
    if (reallyInitialStatusFollowing) return null; // No mostrar botón si el estado inicial real no es seguir

    // Animación al hacer hover sobre "Siguiendo" para mostrar "Dejar de seguir"
    const label =
        isFollowing
            ? showUnfollow
                ? "Dejar de seguir"
                : "Siguiendo"
            : "Seguir";

    function handleSubmit() {
        if (isFollowing) {
            unfollow();
            setShowUnfollow(false);
        } else {
            follow();
            setShowUnfollow(false);
        }
    }

    return (
        <div className="inline-block relative">
            <button
                type="button"
                className={[
                    "flex items-center px-2 py-0.5 rounded-full text-xs font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 select-none",
                    loading
                        ? "opacity-70 cursor-not-allowed"
                        : isFollowing
                            ? showUnfollow
                                ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                                : "bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100"
                            : "bg-gradient-to-tr from-blue-600 to-blue-400 text-white hover:from-blue-700 hover:to-blue-500 border border-blue-500",
                ].join(" ")}
                disabled={loading}
                aria-pressed={!!isFollowing}
                aria-label={label}
                onClick={handleSubmit}
                onMouseEnter={() => isFollowing && setShowUnfollow(true)}
                onMouseLeave={() => setShowUnfollow(false)}
            >
                {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <>

                        <span>{label}</span>
                    </>
                )}
            </button>
            {error && (
                <span className="absolute left-1/2 -translate-x-1/2 mt-2 text-xs text-red-500 bg-white bg-opacity-80 px-2 py-1 rounded shadow">
                    {error}
                </span>
            )}
        </div>
    );
}
