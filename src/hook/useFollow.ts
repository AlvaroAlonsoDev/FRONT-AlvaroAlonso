import {
    followUserApi,
    unfollowUserApi,
} from "../helpers/api.follow";
import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { updateFollowingStatusPopular } from "../store/slices/popularSlice";
import { updateFollowingStatusFeed } from "../store/slices/feedSlice";
import { useDispatch } from "react-redux";
import { useAnimation } from "../contexts/AnimationContext";

export function useFollow(targetUserId: string, initialFollowing: boolean = false) {
    const { token } = useAuth();
    const [isFollowing, setIsFollowing] = useState<boolean>(initialFollowing);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const { triggerAnimation } = useAnimation();

    useEffect(() => {
        setIsFollowing(initialFollowing);
    }, [initialFollowing]);

    // Follow
    const follow = useCallback(async () => {
        if (!token || !targetUserId) return;
        setLoading(true);
        setError(null);
        try {
            setIsFollowing(true);
            const res = await followUserApi({ targetUserId, token });
            if (res.success) {
                setIsFollowing(true);
                dispatch(updateFollowingStatusPopular({ targetId: targetUserId }));
                dispatch(updateFollowingStatusFeed({ targetId: targetUserId }));
                triggerAnimation();
            }
            else {
                setIsFollowing(false);
                setError(res.message || "No se pudo seguir al usuario");
            }
        } catch (e) {
            setError("Error de red");
        } finally {
            setLoading(false);
        }
    }, [token, targetUserId]);

    // Unfollow
    const unfollow = useCallback(async () => {
        if (!token || !targetUserId) return;
        setLoading(true);
        setError(null);
        try {
            setIsFollowing(false);
            const res = await unfollowUserApi({ targetUserId, token });
            if (res.success) {
                setIsFollowing(false);
                dispatch(updateFollowingStatusPopular({ targetId: targetUserId }));
                dispatch(updateFollowingStatusFeed({ targetId: targetUserId }));
                triggerAnimation();
            }
            else {
                setIsFollowing(true);
                setError(res.message || "No se pudo dejar de seguir");
            }
        } catch (e) {
            setError("Error de red");
        } finally {
            setLoading(false);
        }
    }, [token, targetUserId]);

    return {
        isFollowing,
        loading,
        error,
        follow,
        unfollow,
    };
}
