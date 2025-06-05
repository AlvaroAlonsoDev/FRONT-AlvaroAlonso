import { URL_API } from "../config/config";

// POST /api/follow/:targetUserId
export async function followUserApi({ targetUserId, token }: { targetUserId: string; token: string; }) {
    console.log("followUser API");
    const res = await fetch(`${URL_API}/api/follow/${targetUserId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return res.json();
}

// DELETE /api/follow/:targetUserId
export async function unfollowUserApi({ targetUserId, token }: { targetUserId: string; token: string; }) {
    console.log("unfollowUser API");
    const res = await fetch(`${URL_API}/api/follow/${targetUserId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    return res.json();
}

// GET /api/follow/status/:targetUserId
export async function getFollowStatusApi({ targetUserId, token }: { targetUserId: string; token: string; }) {
    console.log("getFollowStatus API");
    const res = await fetch(`${URL_API}/api/follow/status/${targetUserId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    return res.json();
}

// GET /api/follow/following/me
export async function getMyFollowingApi({ token }: { token: string; }) {
    console.log("getMyFollowing API");
    const res = await fetch(`${URL_API}/api/follow/following/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    return res.json();
}

// GET /api/follow/followers/me
export async function getMyFollowersApi({ token }: { token: string; }) {
    console.log("getMyFollowers API");
    const res = await fetch(`${URL_API}/api/follow/followers/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    return res.json();
}

// GET /api/follow/followers/:userId (público)
export async function getPublicFollowersApi({ userId }: { userId: string; }) {
    console.log("getPublicFollowers API");
    const res = await fetch(`${URL_API}/api/follow/followers/${userId}`);
    return res.json();
}

// GET /api/follow/following/:userId (público)
export async function getPublicFollowingApi({ userId }: { userId: string; }) {
    console.log("getPublicFollowing API");
    const res = await fetch(`${URL_API}/api/follow/following/${userId}`);
    return res.json();
}
