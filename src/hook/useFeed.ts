import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFeedApi } from "../helpers/api.post";
import { useAuth } from "../contexts/AuthContext";
import { useAppSelector } from "../store/useAppSelector";
import { setError, setFeed, setLoading, type Post, } from "../store/slices/feedSlice";
import mockFeed from "../mockFeed.json";
export function useFeed() {
    const dispatch = useDispatch();
    const { token } = useAuth();

    const feed = useAppSelector((state) => state.feed.posts);
    const loading = useAppSelector((state) => state.feed.loading);
    const error = useAppSelector((state) => state.feed.error);

    // Solo cargar feed
    useEffect(() => {
        const fetchFeed = async () => {
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

                // console.log("Mock feed data:", mockFeed.data);
                // const posts: Post[] = mockFeed.data.map(post => ({
                //     _id: post._id,
                //     author: {
                //         _id: post.author._id,
                //         avatar: post.author.avatar,
                //         displayName: post.author.displayName,
                //         handle: post.author.handle,
                //     },
                //     createdAt: post.createdAt,
                //     likesCount: post.likesCount,
                //     likedByMe: false, // inventada si falta
                //     content: post.content,
                //     repliesCount: post.repliesCount,
                //     repostsCount: post.repostsCount,
                //     replyTo: null,
                //     media: Array.isArray(post.media)
                //         ? post.media.map((m: any) => typeof m === 'string' ? m : (m?.url ?? ''))
                //         : [],
                // }));
                // dispatch(setFeed(posts));
            } catch {
                dispatch(setError("Error de red"));
            } finally {
                dispatch(setLoading(false));
            }
        };
        fetchFeed();
    }, [token, dispatch]);

    // Puedes devolver función refreshFeed para recargar bajo demanda
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
