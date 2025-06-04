import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { loginApi, registerApi, verifyTokenApi } from "../helpers/api.auth";

type User = {
    _id: string;
    handle: string;
    displayName: string;
    email: string;
    avatar: string;
    // ...agrega los campos que necesites
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; message: string; }>;
    register: (data: { email: string; password: string; handle: string; displayName: string; }) => Promise<{ success: boolean; message: string; }>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        const stored = localStorage.getItem("auth");
        if (stored) {
            const { token } = JSON.parse(stored);

            try {
                // Llama al endpoint de verify para asegurarte de que el token es válido
                const res = await verifyTokenApi(token);
                if (res.success && res.data?.user) {
                    setUser(res.data.user);
                    setToken(token);
                    localStorage.setItem("auth", JSON.stringify({ user: res.data.user, token }));
                } else {
                    // Si el token no es válido, limpiamos todo
                    setUser(null);
                    setToken(null);
                    localStorage.removeItem("auth");
                }
            } catch (e) {
                // En caso de error, también limpiamos todo
                setUser(null);
                setToken(null);
                localStorage.removeItem("auth");
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await loginApi({ email, password });

            if (res.success && res.data?.token && res.data?.user) {
                setUser(res.data.user);
                setToken(res.data.token);
                localStorage.setItem("auth", JSON.stringify({ user: res.data.user, token: res.data.token }));
                return { success: true, message: "Login correcto" };
            }
            return { success: false, message: res.message || "Credenciales incorrectas" };
        } catch (err) {
            return { success: false, message: "Error de conexión con el servidor" };
        }
    };

    // Aquí la función de registro
    const register = async (data: { email: string; password: string; handle: string; displayName: string; }) => {
        try {
            const res = await registerApi(data);
            if (res.status === 201 || res.success) {
                return { success: true, message: "Usuario registrado correctamente" };
            } else {
                return { success: false, message: res.message || "No se pudo registrar el usuario" };
            }
        } catch (err) {
            return { success: false, message: "Error de conexión con el servidor" };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("auth");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}