import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getProfileApi } from "../helpers/api.user";


export function useProfile() {
    const { token } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) return;
        setLoading(true);
        setError(null);

        getProfileApi(token)
            .then((res) => {
                if (res.success && res.data) {
                    setProfile(res.data);
                } else {
                    setError(res.message || "No se pudo cargar el perfil");
                }
            })
            .catch(() => setError("Error de red"))
            .finally(() => setLoading(false));
    }, [token]);

    return { profile, loading, error };
}
