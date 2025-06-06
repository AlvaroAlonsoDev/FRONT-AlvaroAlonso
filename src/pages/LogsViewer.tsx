import React, { useState } from "react";

// Mock data (puedes importar esto de un archivo aparte si prefieres)
const logs = [
    {
        _id: "6842a3384ad7a101448e1e5e",
        level: "info",
        message: "Login exitoso",
        meta: {
            email: "airuritac@gmail.com"
        },
        user: null,
        createdAt: "2025-06-06T08:13:44.798Z",
        updatedAt: "2025-06-06T08:13:44.798Z",
        __v: 0
    },
    {
        _id: "6842a28cb4707c54cc97e56b",
        level: "info",
        message: "Usuario comenzó a seguir a otro usuario",
        meta: {
            follower: "6839c0606ae1a2b5e8cbc24f",
            following: "6839c08b6ae1a2b5e8cbc25b",
            followId: "6842a28cb4707c54cc97e569"
        },
        user: "6839c0606ae1a2b5e8cbc24f",
        createdAt: "2025-06-06T08:10:52.884Z",
        updatedAt: "2025-06-06T08:10:52.884Z",
        __v: 0
    },
    {
        _id: "6842a28ab4707c54cc97e566",
        level: "info",
        message: "Todos los posts paginados obtenidos",
        meta: {
            userId: "6839c0606ae1a2b5e8cbc24f",
            count: 68
        },
        user: "6839c0606ae1a2b5e8cbc24f",
        createdAt: "2025-06-06T08:10:50.973Z",
        updatedAt: "2025-06-06T08:10:50.973Z",
        __v: 0
    },
    {
        _id: "6842a287b4707c54cc97e55d",
        level: "info",
        message: "Post creado correctamente",
        meta: {
            userId: "6839c0606ae1a2b5e8cbc24f",
            postId: "6842a287b4707c54cc97e557",
            replyTo: "68417f769640d1fa9733f70c"
        },
        user: "6839c0606ae1a2b5e8cbc24f",
        createdAt: "2025-06-06T08:10:47.397Z",
        updatedAt: "2025-06-06T08:10:47.397Z",
        __v: 0
    },
    {
        _id: "6842a26bb4707c54cc97e552",
        level: "info",
        message: "Like añadido a post",
        meta: {
            userId: "6839c0606ae1a2b5e8cbc24f",
            postId: "6842002335694964aac544b4"
        },
        user: "6839c0606ae1a2b5e8cbc24f",
        createdAt: "2025-06-06T08:10:19.895Z",
        updatedAt: "2025-06-06T08:10:19.895Z",
        __v: 0
    },
    {
        _id: "6842a268b4707c54cc97e54c",
        level: "info",
        message: "Feed generado correctamente",
        meta: {
            userId: "6839c0606ae1a2b5e8cbc24f",
            count: 9,
            page: "1",
            limit: "10"
        },
        user: "6839c0606ae1a2b5e8cbc24f",
        createdAt: "2025-06-06T08:10:16.150Z",
        updatedAt: "2025-06-06T08:10:16.150Z",
        __v: 0
    },
    {
        _id: "6842a265b4707c54cc97e543",
        level: "info",
        message: "Valoraciones emitidas obtenidas correctamente",
        meta: {
            userId: "6839c0606ae1a2b5e8cbc24f",
            requestedBy: "6839c0606ae1a2b5e8cbc24f",
            count: 2
        },
        user: "6839c0606ae1a2b5e8cbc24f",
        createdAt: "2025-06-06T08:10:13.817Z",
        updatedAt: "2025-06-06T08:10:13.817Z",
        __v: 0
    },
    {
        _id: "6842a265b4707c54cc97e53f",
        level: "info",
        message: "Historial de valoraciones obtenido correctamente",
        meta: {
            userId: "6839c0606ae1a2b5e8cbc24f",
            count: 0
        },
        user: null,
        createdAt: "2025-06-06T08:10:13.734Z",
        updatedAt: "2025-06-06T08:10:13.734Z",
        __v: 0
    },
    {
        _id: "6842a265b4707c54cc97e53b",
        level: "info",
        message: "Login exitoso",
        meta: {
            email: "airuritac@gmail.com"
        },
        user: null,
        createdAt: "2025-06-06T08:10:13.550Z",
        updatedAt: "2025-06-06T08:10:13.550Z",
        __v: 0
    },
    {
        _id: "6842a23ab4707c54cc97e537",
        level: "info",
        message: "Valoraciones emitidas obtenidas correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            requestedBy: "683e08f187b60bcfe8ffad36",
            count: 5
        },
        user: "683e08f187b60bcfe8ffad36",
        createdAt: "2025-06-06T08:09:30.851Z",
        updatedAt: "2025-06-06T08:09:30.851Z",
        __v: 0
    },
    {
        _id: "6842a23ab4707c54cc97e534",
        level: "info",
        message: "Historial de valoraciones obtenido correctamente",
        meta: {
            userId: "683e08f187b60bcfe8ffad36",
            count: 1
        },
        user: null,
        createdAt: "2025-06-06T08:09:30.789Z",
        updatedAt: "2025-06-06T08:09:30.789Z",
        __v: 0
    }
];

// Helpers
function formatDate(date: string) {
    return new Date(date).toLocaleString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
}

function levelColor(level: string) {
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

export const LogsViewer: React.FC = () => {
    const [expanded, setExpanded] = useState<string | null>(null);
    const [levelFilter, setLevelFilter] = useState<string>("all");

    // Obtener los niveles únicos del mock, por si se añaden otros niveles
    // const uniqueLevels = Array.from(new Set(logs.map(l => l.level)));

    const filteredLogs =
        levelFilter === "all"
            ? logs
            : logs.filter((log) => log.level === levelFilter);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#161e27] via-[#253143] to-[#2c3342] flex flex-col items-center py-6 px-2 sm:px-4 dark">
            <div className="w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 text-center tracking-tight">
                    Registro de Actividad
                </h2>
                {/* Filtro de niveles */}
                <div className="flex justify-center flex-wrap gap-2 mb-5 sticky top-0 z-10 bg-transparent">
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
                                            log.level
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
                                            <div className="flex flex-col sm:flex-row sm:items-center">
                                                <dt className="w-24 min-w-fit font-semibold shrink-0">Usuario</dt>
                                                <dd>
                                                    {log.user ?? (
                                                        <span className="italic text-slate-400">Sistema</span>
                                                    )}
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