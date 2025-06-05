import { useDispatch } from "react-redux";
import { getFeedApi } from "../helpers/api.post";
import { useAuth } from "../contexts/AuthContext";
import { useAppSelector } from "../store/useAppSelector";
import { setError, setFeed, setLoading } from "../store/slices/feedSlice";

export function useFeed() {
    const dispatch = useDispatch();
    const { token } = useAuth();

    const feed = useAppSelector((state) => state.feed.posts);
    const loading = useAppSelector((state) => state.feed.loading);
    const error = useAppSelector((state) => state.feed.error);

    const refreshFeed = async () => {
        if (!token) return;
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const res = await getFeedApi(token, 1, 10);
            if (res.success && res.data) {
                dispatch(setFeed(res.data));
            } else {
                dispatch(setError(res.message || "Error al cargar el feed"));
            }
        } catch {
            dispatch(setError("Error de red"));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return { feed, loading, error, refreshFeed };
}
