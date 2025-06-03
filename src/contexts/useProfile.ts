import { useEffect, useState } from "react";
// import { getProfileApi } from "../helpers/api.user";
import { useAuth } from "../contexts/AuthContext";
import mockProfile from "../mockProfile.json";


export function useProfile() {
    const { token } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) return;
        setLoading(true);
        setError(null);

        setProfile(mockProfile.data); // Usar mockProfile para pruebas
        setLoading(false);

        // getProfileApi(token)
        //     .then((res) => {
        //         if (res.success && res.data) {
        //             setProfile(res.data);
        //         } else {
        //             setError(res.message || "No se pudo cargar el perfil");
        //         }
        //     })
        //     .catch(() => setError("Error de red"))
        //     .finally(() => setLoading(false));
    }, [token]);

    return { profile, loading, error };
}
