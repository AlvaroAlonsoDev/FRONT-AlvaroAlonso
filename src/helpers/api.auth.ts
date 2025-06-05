import { URL_API } from "../config/config";

export async function loginApi({ email, password }: { email: string, password: string }) {
    console.log("Login API");

    const res = await fetch(`${URL_API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    return res.json();
}

// TODO: Implementar esta funcion cada x tiempo para verificar el token
export async function verifyTokenApi(token: string | null) {
    console.log("Verificando token API");
    if (!token) throw new Error("Token requerido para verificar");
    const res = await fetch(`${URL_API}/api/auth/verify`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    return res.json();
}

export async function registerApi({ email, password, handle, displayName }:
    { email: string; password: string; handle: string; displayName: string; }) {
    console.log("Register API");
    const res = await fetch(`${URL_API}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, handle, displayName }),
    });
    return res.json();
}
