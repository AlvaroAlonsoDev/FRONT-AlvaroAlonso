// src/pages/MeetBack.tsx

import { Link } from "react-router-dom";
import { RatingCard } from "../components/RatingsHistoryList";
import RatingButton from "../components/RatingButton";

const MeetBack = () => {
    return (
        <>

            {/* Sección principal */}
            <main className="flex flex-col items-center justify-center flex-1 p-4">
                {/* Icono estrella */}
                <div className="mb-4">
                    <svg
                        className="w-16 h-16 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.539 1.118l-3.388-2.462a1 1 0 00-1.176 0l-3.388 2.462c-.783.57-1.838-.197-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.05 9.401c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                    </svg>
                </div>

                {/* Mensaje principal */}
                <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                    Valora a las personas que conoces
                </h2>
                <p className="text-gray-500 text-center mb-6">
                    Ayuda a construir una comunidad auténtica dando tu opinión real sobre personas con las que has tenido contacto.
                </p>

                {/* Botón principal */}
                <RatingButton />

                {/* Accesos rápidos */}
                <div className="flex gap-4 mt-6">
                    <Link
                        to="/profile"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Ver mi perfil
                    </Link>
                    <Link
                        to="/ranking"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Ver ranking
                    </Link>
                </div>

                {/* Historial de valoraciones (opcional) */}
                <div className="mt-8 w-full max-w-md">
                    <h3 className="font-semibold text-gray-800 mb-2">
                        Tus últimas valoraciones
                    </h3>
                    <ul className="divide-y divide-gray-100 space-y-2">
                        {/* Esto lo puedes mapear desde props o state */}
                        <RatingCard
                            _id="1"
                            from={{ displayName: "Juan Pérez", handle: "@juanperez", avatar: "https://cdn-icons-png.freepik.com/256/13979/13979208.png" }}
                            ratings={{
                                "sincerity": 4,
                                "kindness": 4,
                                "trust": 5,
                                "vibe": 4,
                                "responsibility": 4
                            }}
                            comment="Excelente persona, muy profesional."
                            createdAt="2023-10-01"
                        />
                        <RatingCard
                            _id="2"
                            from={{ displayName: "Ana López", handle: "@analopez", avatar: "https://apex.oracle.com/pls/apex/r/apex_pm/42/files/static/v313/img/persona-female01-apex.png" }}
                            ratings={{
                                "sincerity": 5,
                                "kindness": 5,
                                "trust": 4,
                                "vibe": 5,
                                "responsibility": 5
                            }}
                            comment="Muy amable y siempre dispuesta a ayudar."
                            createdAt="2023-09-28"
                        />
                    </ul>
                </div>
            </main>
        </>
    );
};

export default MeetBack;
