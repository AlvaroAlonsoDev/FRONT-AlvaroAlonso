import { URL_API } from "../config/config";

export async function getProfileApi(token: string) {
    console.log("Fetching profile API");
    const res = await fetch(`${URL_API}/api/auth/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
}
