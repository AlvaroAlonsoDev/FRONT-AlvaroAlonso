import { URL_API } from "../config/config";

/**
 * Obtiene usuarios cercanos al usuario autenticado.
 * @param {string} token - Token JWT de autenticación
 * @returns {Promise<Array>} - Array de usuarios cercanos
 */
export async function getCloseToMeApi(token: string) {
    console.log('getCloseToMeApi API');
    const res = await fetch(`${URL_API}/api/auth/close-to-me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        throw new Error("Error al obtener usuarios cercanos");
    }
    return res.json();
}

/**
 * Obtiene el perfil del usuario autenticado.
 * @param {string} token - Token JWT de autenticación
 * @returns {Promise<Object>} - Objeto con los datos del perfil del usuario
 */
export async function getProfileApi(token: string) {
    console.log("getProfileApi API");
    const res = await fetch(`${URL_API}/api/auth/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
}
