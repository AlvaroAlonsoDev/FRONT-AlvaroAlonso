import { useDispatch } from "react-redux";
import { useAnimation } from "../contexts/AnimationContext";
import { useAuth } from "../contexts/AuthContext";
import {
    createRatingApi,
    getUserRatingsApi,
    getRatingsHistoryApi,
    getRatingsGivenByUserApi,
} from "../helpers/api.rating";
import {
    addRatingGiven,
    setRatingsToMe,
    setRatingsGiven,
    setRatingsStats,
    setError,
    setLoading,
} from "../store/slices/ratingSlice";

type RatingAspects = {
    sincerity?: number;
    kindness?: number;
    trust?: number;
    vibe?: number;
    responsibility?: number;
    // puedes añadir más si los necesitas
};

type CreateRatePayload = {
    toUserId: string;
    ratings: RatingAspects;
    comment?: string;
};

export function useRating(targetUserId?: string) {
    const dispatch = useDispatch();
    const { token, user } = useAuth();
    const { triggerAnimation } = useAnimation();

    // Crea una valoración y la añade a ratingsGiven si éxito
    const createRate = async (payload: CreateRatePayload) => {
        if (!token) throw new Error("No token");
        dispatch(setLoading(true));
        try {
            const res = await createRatingApi(payload, token);

            if ((res.status && res.status === 200) || res.success) {
                triggerAnimation("Valoración creada");
                if (res.data) dispatch(addRatingGiven(res.data)); // Actualiza Redux con la nueva valoración
                dispatch(setLoading(false));
                return res.success;
            } else {
                triggerAnimation("Error al crear la valoración");
                dispatch(setError(res.message || "No se pudo crear la valoración"));
                dispatch(setLoading(false));
                throw new Error(res.message || "No se pudo crear la valoración");
            }
        } catch (err: any) {
            triggerAnimation("Error al crear la valoración");
            dispatch(setError(err.message || "No se pudo crear la valoración"));
            dispatch(setLoading(false));
            throw err;
        }
    };

    // Carga las estadísticas y las guarda en Redux
    const getRatingsStats = async (userId = targetUserId) => {
        if (!userId) throw new Error("userId es requerido");
        dispatch(setLoading(true));
        try {
            const res = await getUserRatingsApi(userId);
            if ((res.status && res.status === 200) || res.success) {
                dispatch(setRatingsStats(res.data));
                dispatch(setLoading(false));
                return res.success;
            } else {
                dispatch(setError(res.message || "No se pudo obtener el promedio de valoraciones"));
                dispatch(setLoading(false));
                throw new Error(res.message || "No se pudo obtener el promedio de valoraciones");
            }
        } catch (err: any) {
            dispatch(setError(err.message || "No se pudo obtener el promedio de valoraciones"));
            dispatch(setLoading(false));
            throw err;
        }
    };

    // Carga el historial recibido y lo mete en Redux
    const getRatingsHistory = async (userId = targetUserId) => {
        if (!userId) throw new Error("userId es requerido");
        dispatch(setLoading(true));
        try {
            const res = await getRatingsHistoryApi(userId);
            if ((res.status && res.status === 200) || res.success) {
                dispatch(setRatingsToMe(res.data));
                dispatch(setLoading(false));
                return res.success;
            } else {
                dispatch(setError(res.message || "No se pudo obtener el historial de valoraciones"));
                dispatch(setLoading(false));
                throw new Error(res.message || "No se pudo obtener el historial de valoraciones");
            }
        } catch (err: any) {
            dispatch(setError(err.message || "No se pudo obtener el historial de valoraciones"));
            dispatch(setLoading(false));
            throw err;
        }
    };

    // Carga las emitidas por mí y actualiza Redux
    const getRatingsGiven = async (userId = user?._id) => {
        if (!token) throw new Error("No token");
        if (!userId) throw new Error("userId es requerido");
        dispatch(setLoading(true));
        try {
            const res = await getRatingsGivenByUserApi(userId, token);
            if ((res.status && res.status === 200) || res.success) {
                dispatch(setRatingsGiven(res.data));
                dispatch(setLoading(false));
                return res.data;
            } else {
                dispatch(setError(res.message || "No se pudo obtener las valoraciones emitidas"));
                dispatch(setLoading(false));
                throw new Error(res.message || "No se pudo obtener las valoraciones emitidas");
            }
        } catch (err: any) {
            dispatch(setError(err.message || "No se pudo obtener las valoraciones emitidas"));
            dispatch(setLoading(false));
            throw err;
        }
    };

    return {
        createRate,
        getRatingsStats,
        getRatingsHistory,
        getRatingsGiven,
    };
}
