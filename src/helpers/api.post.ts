// helpers/api.post.ts
import { URL_API } from "../config/config";

export async function getFeedApi(token: string, page = 1, limit = 20) {
    console.log("Fetching feed API");
    const res = await fetch(`${URL_API}/api/post/feed/me?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

export async function createPostApi(
    token: string,
    data: { content: string; media?: string[]; replyTo?: string }
) {
    const res = await fetch(`${URL_API}/api/post`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deletePostApi(token: string, postId: string) {
    const res = await fetch(`${URL_API}/api/post/${postId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    return res.json();
}