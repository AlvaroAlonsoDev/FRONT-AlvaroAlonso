import { useState } from "react";

// Mock data (puedes importar esto de un archivo aparte si prefieres)
const logs = [
    {
        _id: "6842df782cd94085dfdfaa91",
        level: "info",
        message: "Valoraciones emitidas obtenidas correctamente",
        meta: {
            userId: "6839c0606ae1a2b5e8cbc24f",
            requestedBy: "6839c0606ae1a2b5e8cbc24f",
            count: 2
        },
        user: {
            _id: "6839c0606ae1a2b5e8cbc24f",
            handle: "alvaroalonso",
            displayName: "Alvaro Alonso",
            avatar: "https://www.muydemi.com/web/image/product.image/3599/image_256/GORRO%20HOMBRE%20%28pack%203ud%29?unique=416ff6c"
        },
        createdAt: "2025-06-06T12:30:48.642Z",
        updatedAt: "2025-06-06T12:30:48.642Z",
        __v: 0
    },
    {
        _id: "6842df782cd94085dfdfaa8d",
        level: "info",
        message: "Historial de valoraciones obtenido correctamente",
        meta: {
            userId: "6839c0606ae1a2b5e8cbc24f",
            count: 0
        },
        user: null,
        createdAt: "2025-06-06T12:30:48.528Z",
        updatedAt: "2025-06-06T12:30:48.528Z",
        __v: 0
    },
    {
        _id: "6842df782cd94085dfdfaa89",
        level: "info",
        message: "Login exitoso",
        meta: {
            email: "airuritac@gmail.com"
        },
        user: null,
        createdAt: "2025-06-06T12:30:48.373Z",
        updatedAt: "2025-06-06T12:30:48.373Z",
        __v: 0
    },
    {
        _id: "6842df672cd94085dfdfaa85",
        level: "info",
        message: "Perfil obtenido correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            postsCount: 3,
            ratingsGivenCount: 5,
            followersCount: [
                "6839c0806ae1a2b5e8cbc255"
            ],
            followingCount: [
                "6839c0806ae1a2b5e8cbc255",
                "6839c0926ae1a2b5e8cbc25e"
            ]
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:30:31.419Z",
        updatedAt: "2025-06-06T12:30:31.419Z",
        __v: 0
    },
    {
        _id: "6842df1a2cd94085dfdfaa77",
        level: "info",
        message: "Feed generado correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            count: 9,
            page: "1",
            limit: "10"
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:29:14.379Z",
        updatedAt: "2025-06-06T12:29:14.379Z",
        __v: 0
    },
    {
        _id: "6842df162cd94085dfdfaa6e",
        level: "info",
        message: "Valoraciones emitidas obtenidas correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            requestedBy: "683e08f187b60bcfe8ffad36",
            count: 5
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:29:10.488Z",
        updatedAt: "2025-06-06T12:29:10.488Z",
        __v: 0
    },
    {
        _id: "6842df162cd94085dfdfaa6b",
        level: "info",
        message: "Historial de valoraciones obtenido correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            count: 1
        },
        user: null,
        createdAt: "2025-06-06T12:29:10.444Z",
        updatedAt: "2025-06-06T12:29:10.444Z",
        __v: 0
    },
    {
        _id: "6842ded22cd94085dfdfaa65",
        level: "info",
        message: "Valoraciones emitidas obtenidas correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            requestedBy: "683e08f187b60bcfe8ffad36",
            count: 5
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:28:02.826Z",
        updatedAt: "2025-06-06T12:28:02.826Z",
        __v: 0
    },
    {
        _id: "6842ded22cd94085dfdfaa62",
        level: "info",
        message: "Historial de valoraciones obtenido correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            count: 1
        },
        user: null,
        createdAt: "2025-06-06T12:28:02.777Z",
        updatedAt: "2025-06-06T12:28:02.777Z",
        __v: 0
    },
    {
        _id: "6842decd2cd94085dfdfaa5c",
        level: "info",
        message: "Feed generado correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            count: 9,
            page: "1",
            limit: "10"
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:27:57.782Z",
        updatedAt: "2025-06-06T12:27:57.782Z",
        __v: 0
    },
    {
        _id: "6842decc2cd94085dfdfaa53",
        level: "info",
        message: "Valoraciones emitidas obtenidas correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            requestedBy: "683e08f187b60bcfe8ffad36",
            count: 5
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:27:56.270Z",
        updatedAt: "2025-06-06T12:27:56.270Z",
        __v: 0
    },
    {
        _id: "6842decc2cd94085dfdfaa51",
        level: "info",
        message: "Historial de valoraciones obtenido correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            count: 1
        },
        user: null,
        createdAt: "2025-06-06T12:27:56.230Z",
        updatedAt: "2025-06-06T12:27:56.230Z",
        __v: 0
    },
    {
        _id: "6842deca2cd94085dfdfaa47",
        level: "info",
        message: "Valoraciones emitidas obtenidas correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            requestedBy: "683e08f187b60bcfe8ffad36",
            count: 5
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:27:54.298Z",
        updatedAt: "2025-06-06T12:27:54.298Z",
        __v: 0
    },
    {
        _id: "6842deca2cd94085dfdfaa44",
        level: "info",
        message: "Historial de valoraciones obtenido correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            count: 1
        },
        user: null,
        createdAt: "2025-06-06T12:27:54.250Z",
        updatedAt: "2025-06-06T12:27:54.250Z",
        __v: 0
    },
    {
        _id: "6842ddab2cd94085dfdfaa3e",
        level: "info",
        message: "Perfil obtenido correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            postsCount: 3,
            ratingsGivenCount: 5,
            followersCount: [
                "6839c0806ae1a2b5e8cbc255"
            ],
            followingCount: [
                "6839c0806ae1a2b5e8cbc255",
                "6839c0926ae1a2b5e8cbc25e"
            ]
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:23:07.693Z",
        updatedAt: "2025-06-06T12:23:07.693Z",
        __v: 0
    },
    {
        _id: "6842dda12cd94085dfdfaa2d",
        level: "info",
        message: "Perfil obtenido correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            postsCount: 3,
            ratingsGivenCount: 5,
            followersCount: [
                "6839c0806ae1a2b5e8cbc255"
            ],
            followingCount: [
                "6839c0806ae1a2b5e8cbc255",
                "6839c0926ae1a2b5e8cbc25e"
            ]
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:22:57.018Z",
        updatedAt: "2025-06-06T12:22:57.018Z",
        __v: 0
    },
    {
        _id: "6842dd0e2cd94085dfdfaa1f",
        level: "info",
        message: "Perfil obtenido correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            postsCount: 3,
            ratingsGivenCount: 5,
            followersCount: [
                "6839c0806ae1a2b5e8cbc255"
            ],
            followingCount: [
                "6839c0806ae1a2b5e8cbc255",
                "6839c0926ae1a2b5e8cbc25e"
            ]
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:20:30.793Z",
        updatedAt: "2025-06-06T12:20:30.793Z",
        __v: 0
    },
    {
        _id: "6842dcd72cd94085dfdfaa0e",
        level: "info",
        message: "Perfil obtenido correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            postsCount: 3,
            ratingsGivenCount: 5,
            followersCount: [
                "6839c0806ae1a2b5e8cbc255"
            ],
            followingCount: [
                "6839c0806ae1a2b5e8cbc255",
                "6839c0926ae1a2b5e8cbc25e"
            ]
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:19:35.452Z",
        updatedAt: "2025-06-06T12:19:35.452Z",
        __v: 0
    },
    {
        _id: "6842dcad2cd94085dfdfaa00",
        level: "info",
        message: "Feed generado correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            count: 9,
            page: "1",
            limit: "10"
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:18:53.149Z",
        updatedAt: "2025-06-06T12:18:53.149Z",
        __v: 0
    },
    {
        _id: "6842dbf42cd94085dfdfa9f4",
        level: "info",
        message: "Feed generado correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            count: 9,
            page: "1",
            limit: "10"
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:15:48.627Z",
        updatedAt: "2025-06-06T12:15:48.627Z",
        __v: 0
    },
    {
        _id: "6842d95e2cd94085dfdfa9e2",
        level: "info",
        message: "Feed generado correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            count: 9,
            page: "1",
            limit: "10"
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:04:46.187Z",
        updatedAt: "2025-06-06T12:04:46.187Z",
        __v: 0
    },
    {
        _id: "6842d95b2cd94085dfdfa9d9",
        level: "info",
        message: "Feed generado correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            count: 9,
            page: "1",
            limit: "10"
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:04:43.178Z",
        updatedAt: "2025-06-06T12:04:43.178Z",
        __v: 0
    },
    {
        _id: "6842d9502cd94085dfdfa9d0",
        level: "info",
        message: "Feed generado correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            count: 9,
            page: "1",
            limit: "10"
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:04:32.999Z",
        updatedAt: "2025-06-06T12:04:32.999Z",
        __v: 0
    },
    {
        _id: "6842d9442cd94085dfdfa9c7",
        level: "info",
        message: "Feed generado correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            count: 9,
            page: "1",
            limit: "10"
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:04:20.300Z",
        updatedAt: "2025-06-06T12:04:20.300Z",
        __v: 0
    },
    {
        _id: "6842d9422cd94085dfdfa9be",
        level: "info",
        message: "Feed generado correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            count: 9,
            page: "1",
            limit: "10"
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:04:18.158Z",
        updatedAt: "2025-06-06T12:04:18.158Z",
        __v: 0
    },
    {
        _id: "6842d93e2cd94085dfdfa9b5",
        level: "info",
        message: "Feed generado correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            count: 9,
            page: "1",
            limit: "10"
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:04:14.502Z",
        updatedAt: "2025-06-06T12:04:14.502Z",
        __v: 0
    },
    {
        _id: "6842d87c2cd94085dfdfa9ac",
        level: "info",
        message: "Feed generado correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            count: 9,
            page: "1",
            limit: "10"
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:01:00.483Z",
        updatedAt: "2025-06-06T12:01:00.483Z",
        __v: 0
    },
    {
        _id: "6842d8682cd94085dfdfa9a3",
        level: "info",
        message: "Valoraciones emitidas obtenidas correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            requestedBy: "683e08f187b60bcfe8ffad36",
            count: 5
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:00:40.192Z",
        updatedAt: "2025-06-06T12:00:40.192Z",
        __v: 0
    },
    {
        _id: "6842d8682cd94085dfdfa9a0",
        level: "info",
        message: "Historial de valoraciones obtenido correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            count: 1
        },
        user: null,
        createdAt: "2025-06-06T12:00:40.146Z",
        updatedAt: "2025-06-06T12:00:40.146Z",
        __v: 0
    },
    {
        _id: "6842d8622cd94085dfdfa99a",
        level: "info",
        message: "Valoraciones emitidas obtenidas correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            requestedBy: "683e08f187b60bcfe8ffad36",
            count: 5
        },
        user: {
            _id: "683e08f187b60bcfe8ffad36",
            handle: "invitado",
            displayName: "Invitado",
            avatar: "https://cdn-icons-png.flaticon.com/256/2598/2598691.png"
        },
        createdAt: "2025-06-06T12:00:34.252Z",
        updatedAt: "2025-06-06T12:00:34.252Z",
        __v: 0
    }
];

// Helpers
function formatDate(date: Date | string) {
    return new Date(date).toLocaleString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
}

function levelColor(level: "error" | "warn" | "info") {
    switch (level) {
        case "error":
            return "text-red-500 border-red-400 bg-red-50 dark:bg-red-900/10";
        case "warn":
            return "text-yellow-500 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/10";
        default:
            return "text-blue-500 border-blue-400 bg-blue-50 dark:bg-blue-900/10";
    }
}

const LEVELS = [
    { key: "all", label: "Todos" },
    { key: "info", label: "Info" },
    { key: "warn", label: "Warn" },
    { key: "error", label: "Error" },
];

// Obtener usuarios únicos (por _id, handle, displayName)
function getUserKey(log: any) {
    if (log.user && log.user._id) return log.user._id;
    if (log.meta && log.meta.email) return log.meta.email;
    return "Sistema";
}

function getUserLabel(log: any) {
    if (log.user) {
        if (log.user.displayName && log.user.handle) {
            return `${log.user.displayName} (@${log.user.handle})`;
        }
        if (log.user.handle) return `@${log.user.handle}`;
        if (log.user.displayName) return log.user.displayName;
        if (log.user._id) return log.user._id;
    }
    if (log.meta && log.meta.email) return log.meta.email;
    return "Sistema";
}

function getUserAvatar(log: any) {
    if (log.user && log.user.avatar) return log.user.avatar;
    return null;
}

const uniqueUsers = Array.from(
    logs.reduce((acc, log) => {
        const key = getUserKey(log);
        const label = getUserLabel(log);
        const avatar = getUserAvatar(log);
        acc.set(key, { key, label, avatar });
        return acc;
    }, new Map()).values()
);

export const LogsViewer = () => {
    const [expanded, setExpanded] = useState<string | null>(null);
    const [levelFilter, setLevelFilter] = useState("all");
    const [userFilter, setUserFilter] = useState("all");

    // Aplica ambos filtros
    const filteredLogs = logs.filter((log) => {
        const levelOk = levelFilter === "all" || log.level === levelFilter;
        const userKey = getUserKey(log);
        const userOk = userFilter === "all" || userKey === userFilter;
        return levelOk && userOk;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#161e27] via-[#253143] to-[#2c3342] flex flex-col items-center py-6 px-2 sm:px-4 dark">
            <div className="w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 text-center tracking-tight">
                    Registro de Actividad
                </h2>
                {/* Filtros */}
                <div className="flex flex-wrap gap-3 mb-4 justify-center items-center">
                    {/* Filtro de niveles */}
                    <div className="flex gap-2">
                        {LEVELS.map((item) => (
                            <button
                                key={item.key}
                                type="button"
                                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border transition
                  ${item.key === levelFilter
                                        ? "bg-blue-600 border-blue-700 text-white shadow-md"
                                        : "bg-white/70 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700 text-blue-700 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-slate-700"
                                    }`}
                                onClick={() => setLevelFilter(item.key)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                    {/* Filtro de usuarios */}
                    <select
                        className="px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border bg-white/70 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700 text-blue-700 dark:text-blue-200"
                        value={userFilter}
                        onChange={(e) => setUserFilter(e.target.value)}
                    >
                        <option value="all">Todos los usuarios</option>
                        {uniqueUsers.map((u) => (
                            <option key={u.key} value={u.key}>
                                {u.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="rounded-2xl shadow-2xl bg-white/80 dark:bg-[#222b38]/80 backdrop-blur-xl border border-slate-300 dark:border-slate-700">
                    {filteredLogs.length === 0 ? (
                        <div className="py-10 text-center text-slate-400 dark:text-slate-500 text-base">
                            No hay logs para este filtro.
                        </div>
                    ) : (
                        filteredLogs.map((log) => (
                            <div
                                key={log._id}
                                className="transition-all duration-200 border-b last:border-b-0 group border-slate-200 dark:border-slate-700 hover:bg-slate-100/60 dark:hover:bg-slate-700/30"
                            >
                                <button
                                    aria-expanded={expanded === log._id}
                                    className="w-full flex sm:flex-row items-start sm:items-center px-3 py-4 gap-2 sm:gap-4 focus:outline-none"
                                    onClick={() => setExpanded(expanded === log._id ? null : log._id)}
                                >
                                    <span
                                        className={`rounded-full px-2 py-0.5 text-xs font-semibold border ${levelColor(
                                            log.level as "info" | "warn" | "error"
                                        )}`}
                                    >
                                        {log.level.toUpperCase()}
                                    </span>
                                    <span className="flex-1 text-left text-slate-800 dark:text-slate-200 font-medium text-sm sm:text-base break-words">
                                        {log.message}
                                    </span>
                                    <span className="text-xs text-slate-400 font-mono whitespace-nowrap">
                                        {formatDate(log.createdAt)}
                                    </span>
                                    <svg
                                        className={`sm:ml-3 h-4 w-4 text-slate-400 transition-transform duration-200 ${expanded === log._id ? "rotate-180" : ""
                                            }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                {expanded === log._id && (
                                    <div className="px-4 sm:px-10 pb-6 animate-fade-in-down">
                                        <dl className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                                            <div className="flex flex-col sm:flex-row sm:items-center">
                                                <dt className="w-24 min-w-fit font-semibold shrink-0">Fecha</dt>
                                                <dd className="break-all">{formatDate(log.createdAt)}</dd>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                <dt className="w-24 min-w-fit font-semibold shrink-0">Usuario</dt>
                                                <dd className="flex items-center gap-2">
                                                    {getUserAvatar(log) && (
                                                        <img
                                                            src={getUserAvatar(log)}
                                                            alt={getUserLabel(log)}
                                                            className="w-7 h-7 rounded-full border object-cover"
                                                        />
                                                    )}
                                                    <span>
                                                        {getUserLabel(log)}
                                                    </span>
                                                </dd>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-start">
                                                <dt className="w-24 min-w-fit font-semibold shrink-0">Meta</dt>
                                                <dd className="w-full">
                                                    <pre className="bg-slate-100 dark:bg-slate-800/60 rounded-lg p-2 mt-1 text-xs overflow-x-auto whitespace-pre-wrap break-words">
                                                        {JSON.stringify(log.meta, null, 2)}
                                                    </pre>
                                                </dd>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center">
                                                <dt className="w-24 min-w-fit font-semibold shrink-0">ID</dt>
                                                <dd className="text-slate-400 break-all">{log._id}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
            <style>{`
                .animate-fade-in-down {
                    animation: fadeInDown 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                }
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-8px);}
                    to { opacity: 1; transform: translateY(0);}
                }
            `}</style>
        </div>
    );
};