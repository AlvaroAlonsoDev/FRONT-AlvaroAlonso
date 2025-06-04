import { useDispatch } from "react-redux";
import { createPostApi, deletePostApi } from "../helpers/api.post";
import { useAuth } from "../contexts/AuthContext";
import { addPost, removePost, setError } from "../store/slices/feedSlice";
import { useAnimation } from "../contexts/AnimationContext";

export function usePostActions() {
    const dispatch = useDispatch();
    const { triggerAnimation } = useAnimation();
    const { token } = useAuth();

    // Crear post
    const createPost = async (data: { content: string; media?: string[]; replyTo?: string }) => {
        if (!token) return;
        try {
            const res = await createPostApi(token, data);
            if (res.success && res.data) {
                dispatch(addPost(res.data));
                triggerAnimation("Post creado con éxito");
                return res.data;
            } else {
                dispatch(setError(res.message || "No se pudo crear el post"));
                return null;
            }
        } catch {
            dispatch(setError("Error de red"));
            return null;
        }
    };

    // Borrar post
    const deletePost = async (postId: string) => {
        if (!token) return;
        try {
            const res = await deletePostApi(token, postId);
            if (res.success && res.data) {
                dispatch(removePost(postId));
                triggerAnimation("Post eliminado con éxito");
                return true;
            } else {
                dispatch(setError(res.message || "No se pudo borrar el post"));
                return false;
            }
        } catch {
            dispatch(setError("Error de red"));
            return false;
        }
    };

    // Aquí podrías añadir likePost, etc.

    return { createPost, deletePost };
}
