import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPopularApi } from "../helpers/api.post";
import { useAuth } from "../contexts/AuthContext";
import { useAppSelector } from "../store/useAppSelector";
import { setError, setPopular, setLoading } from "../store/slices/popularSlice";

export function usePopular() {
    const dispatch = useDispatch();
    const { token } = useAuth();

    const popularPosts = useAppSelector((state) => state.popular.posts); // O crea un slice separado si quieres distinguirlo
    const loading = useAppSelector((state) => state.popular.loading);
    const error = useAppSelector((state) => state.popular.error);

    // useEffect(() => {
    //     const fetchPopular = async () => {
    //         if (!token) return;
    //         dispatch(setLoading(true));
    //         dispatch(setError(null));
    //         try {
    //             const res = await getPopularApi(token);
    //             console.log("Popular API response:", res);

    //             if (res.success && res.data) {
    //                 dispatch(setPopular(res.data));
    //             } else {
    //                 dispatch(setError(res.message || "Error al cargar los populares"));
    //             }
    //         } catch {
    //             dispatch(setError("Error de red"));
    //         } finally {
    //             dispatch(setLoading(false));
    //         }
    //     };
    //     fetchPopular();
    // }, [token, dispatch]);

    const refreshPopular = async () => {
        if (!token) return;
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const res = await getPopularApi(token);
            if (res.success && res.data) {
                dispatch(setPopular(res.data));
            } else {
                dispatch(setError(res.message || "Error al cargar los populares"));
            }
        } catch {
            dispatch(setError("Error de red"));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return { popularPosts, loading, error, refreshPopular };
}
