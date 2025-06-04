import { useAuth } from "../contexts/AuthContext";
import { likePostApi, unlikePostApi, getLikesOfPostApi } from "../helpers/api.like";

export function useLike(postId: string) {
    const { token } = useAuth();

    const like = async () => {
        if (!token) throw new Error("No token");
        return likePostApi(postId, token);
    };

    const unlike = async () => {
        if (!token) throw new Error("No token");
        return unlikePostApi(postId, token);
    };

    const getLikes = async () => {
        if (!token) throw new Error("No token");
        return getLikesOfPostApi(postId, token);
    };

    return { like, unlike, getLikes };
}
