import { useAnimation } from "../contexts/AnimationContext";
import { useAuth } from "../contexts/AuthContext";
import { likePostApi, unlikePostApi, getLikesOfPostApi } from "../helpers/api.like";

export function useLike(postId: string) {
    const { token } = useAuth();
    const { triggerAnimation } = useAnimation();

    const like = async (): Promise<boolean> => {
        if (!token) throw new Error("No token");
        const res = await likePostApi(postId, token);
        triggerAnimation(!res.success && res.message);
        return res.success;
    };

    const unlike = async (): Promise<boolean> => {
        if (!token) throw new Error("No token");
        const res = await unlikePostApi(postId, token);
        triggerAnimation(!res.success && res.message);
        return res.success;
    };

    const getLikes = async () => {
        if (!token) throw new Error("No token");
        return getLikesOfPostApi(postId, token);
    };

    return { like, unlike, getLikes };
}
