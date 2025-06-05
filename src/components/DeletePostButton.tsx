import { Trash } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import type { Post } from "../store/slices/feedSlice";

type DeletePostButtonProps = {
    post: Post;
    action: () => void;
};

const DeletePostButton = ({ post, action }: DeletePostButtonProps) => {
    const { user } = useAuth();
    const isMyPost = user?._id === post.author._id; // Assuming action has userId property
    if (!isMyPost) return null;
    return (
        <span
            className="flex items-center justify-end gap-1 px-2 py-0.5 rounded-full transition group select-none active:scale-95"
        >
            <button
                onClick={action}
                className={`flex items-center justify-end text-gray-500 hover:text-gray-700`}
                aria-label="Me gusta"
                type="button"
            >
                <Trash size={16} />
            </button>
        </span>
    )
}

export default DeletePostButton