// helpers/api.like.ts
import { URL_API } from "../config/config";

export async function likePostApi(postId: string, token: string) {
    console.log("Like API");

    const res = await fetch(`${URL_API}/api/like/${postId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

export async function unlikePostApi(postId: string, token: string) {
    console.log("Unlike API");
    const res = await fetch(`${URL_API}/api/like/${postId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return res.json();
}

export async function getLikesOfPostApi(postId: string, token?: string) {
    console.log("Get Likes API");
    const res = await fetch(`${URL_API}/api/like/${postId}`, {
        method: "GET",
        headers: token ? { "Authorization": `Bearer ${token}` } : {},
    });
    return res.json();
}
