import { URL_API } from "../config/config";

export async function loginApi({ email, password }: { email: string, password: string }) {
    const res = await fetch(`${URL_API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    return res.json();
}
