import { URL_API } from "../config/config";

// Crear una valoración de un usuario hacia otro
export async function createRatingApi(rating: any, token: string) {
    console.log("createRatingApi API");

    const res = await fetch(`${URL_API}/api/rating`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(rating),
    });
    return res.json();
}

// Obtener promedio de valoraciones de un usuario (por aspecto)
export async function getUserRatingsApi(userId: string) {
    console.log("getUserRatingsApi API");
    const res = await fetch(`${URL_API}/api/rating/${userId}`, {
        method: "GET",
    });
    return res.json();
}

// Listar todas las valoraciones que ha recibido un usuario (historial)
export async function getRatingsHistoryApi(userId: string) {
    console.log("getRatingsHistoryApi API");
    const res = await fetch(`${URL_API}/api/rating/${userId}/history`, {
        method: "GET",
    });
    return res.json();
}

// Listar todas las valoraciones emitidas por un usuario
export async function getRatingsGivenByUserApi(userId: string, token: string) {
    console.log("getRatingsGivenByUserApi API");
    const res = await fetch(`${URL_API}/api/rating/from/${userId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    return res.json();
}
