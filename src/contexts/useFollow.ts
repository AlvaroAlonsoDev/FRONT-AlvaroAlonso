import {
    followUserApi,
    unfollowUserApi,
    getFollowStatusApi,
} from "../helpers/api.follow";
import { useState, useCallback } from "react";
import { useAuth } from "./AuthContext";

export function useFollow(targetUserId: string) {
    const { token } = useAuth();
    const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Chequeo inicial de estado de follow
    const checkFollowStatus = useCallback(async () => {
        if (!token || !targetUserId) return;
        setLoading(true);
        setError(null);
        try {
            const res = await getFollowStatusApi({ targetUserId, token });
            if (res.success) setIsFollowing(!!res.data?.isFollowing);
            else setError(res.message || "Error consultando relación");
        } catch (e) {
            setError("Error de red");
        } finally {
            setLoading(false);
        }
    }, [token, targetUserId]);

    // Follow
    const follow = useCallback(async () => {
        if (!token || !targetUserId) return;
        setLoading(true);
        setError(null);
        try {
            const res = await followUserApi({ targetUserId, token });
            if (res.success) setIsFollowing(true);
            else setError(res.message || "No se pudo seguir al usuario");
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
            const res = await unfollowUserApi({ targetUserId, token });
            if (res.success) setIsFollowing(false);
            else setError(res.message || "No se pudo dejar de seguir");
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
        checkFollowStatus,
        follow,
        unfollow,
    };
}
