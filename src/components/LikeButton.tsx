import React, { useState } from 'react'
import { useLike } from '../hook/useLike';
import { Heart } from 'lucide-react';
import type { Post } from '../store/slices/feedSlice';


const LikeButton = ({ post, size = 18 }: { post: Post, size?: number }) => {
    const [likedByMe, setLikedByMe] = useState(post.likedByMe ?? false);
    const { like, unlike } = useLike(post._id);
    const [initialLikeCount, setInitialLikeCount] = useState(post.likesCount);

    const handleLike = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (likedByMe) {
            const res = await unlike();
            setLikedByMe(false);
            setInitialLikeCount((prev: number) => Math.max(0, prev - 1));
            if (!res) {
                console.error("Error al quitar like:", res);
                setLikedByMe(true);
                setInitialLikeCount((prev: number) => prev + 1);
                return;
            }
        } else {
            const res = await like();
            setLikedByMe(true);
            setInitialLikeCount((prev: number) => prev + 1);
            if (!res) {
                console.error("Error al dar like:", res);
                setLikedByMe(false);
                setInitialLikeCount((prev: number) => Math.max(0, prev - 1));
                return;
            }
        }
    };

    const handleShowLikes = (e: React.MouseEvent) => {
        e.stopPropagation();
        // TODO: Implementar lógica para mostrar los usuarios que han dado like al post
        console.log("Mostrar likes del post", post._id);
    };
    return (
        <span
            className="
                flex items-center gap-1 rounded-full
                transition group select-none px] active:scale-95
            "
            tabIndex={-1}
        >
            <button
                onClick={handleLike}
                className="flex items-center justify-center"
                tabIndex={0}
                aria-label="Me gusta"
                type="button"
            >
                <Heart
                    size={size}
                    className="inline transition"
                    fill={likedByMe ? "#ec4899" : "none"}
                    stroke={likedByMe ? "#ec4899" : "currentColor"}
                />
            </button>
            <button
                onClick={handleShowLikes}
                className="text-xs font-semibold transition text-gray-700"
                tabIndex={0}
                aria-label="Ver personas a las que les gusta"
                type="button"
            >
                {initialLikeCount}
            </button>
        </span>
    )
}

export default LikeButton