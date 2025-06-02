import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { loginApi } from "../helpers/api.auth";

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
    login: (email: string, password: string) => Promise<{ success: boolean; message: string; }>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Persistencia en localStorage
    useEffect(() => {
        const stored = localStorage.getItem("auth");
        if (stored) {
            const { user, token } = JSON.parse(stored);
            setUser(user);
            setToken(token);
        }
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
            // Errores esperados
            return { success: false, message: res.message || "Credenciales incorrectas" };
        } catch (err) {
            return { success: false, message: "Error de conexión con el servidor" };
        }
    };

    const logout = () => {
        // TODO: Implementar endpoint de logout
        setUser(null);
        setToken(null);
        localStorage.removeItem("auth");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
