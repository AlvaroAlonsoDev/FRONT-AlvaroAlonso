import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import type { Post } from "../store/slices/feedSlice";
import { Link } from "react-router-dom";
import type { User } from "../contexts/AuthContext";

export function PostsList({ posts, text, user, onShowAll }: { posts: Post[], user: User, text: string, onShowAll?: () => void }) {
    if (!posts?.length) return null;

    return (
        <div className="flex flex-col gap-2">
            {/* Título y botón */}
            <div className="flex items-center justify-between px-2">
                <span className="font-semibold text-lg text-gray-800">{text}</span>
                <Link
                    to={"/posts/me?from=/profile"}
                    className="text-[#267cff] hover:underline font-medium text-sm transition"
                    onClick={onShowAll}
                >
                    Ver todas
                </Link>
            </div>
            {/* Grid responsivo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 ">
                {posts.map(post =>
                    <PostCard key={post._id} {...post} displayName={user.displayName} />
                )}
            </div>
        </div>
    );
}

function PostCard({
    content,
    createdAt,
    media = [],
    displayName
}: Post & { displayName: string }) {
    return (
        <div className="bg-white flex flex-col border-b transition cursor-pointer py-2 px-2">
            {/* Stats y fecha */}
            <div className="flex items-center gap-2 justify-between">
                <p className="font-medium text-gray-800">{displayName}</p>
                <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: es })}
                </span>
            </div>
            {/* Imagen cuadrada, si hay */}
            {media?.[0] && (
                <div className="w-full aspect-square rounded-xl overflow-hidden my-2">
                    <img
                        src={media[0]}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>
            )}
            {/* Texto post */}
            <div className="text-gray-800 text-sm line-clamp-3">
                {content}
            </div>

        </div>
    );
}