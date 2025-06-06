import { Link } from "react-router-dom";
import { RatingCard } from "../components/RatingsFromMe";
import RatingButton from "../components/RatingButton";
import { useRating } from "../hook/useRating";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";
import type { Rating } from "../store/slices/ratingSlice";

const MeetBack = () => {
    const { user } = useAuth();
    const { getRatingsGiven, getRatingsHistory } = useRating();
    const [loadingGiven, setLoadingGiven] = useState(false);
    const [loadingReceived, setLoadingReceived] = useState(false);

    // Valoraciones emitidas y recibidas desde Redux
    const ratingsGiven = useSelector((state: RootState) => state.rating.ratingsGiven);
    const ratingsToMe = useSelector((state: RootState) => state.rating.ratingsToMe);

    // Cargar valoraciones dadas
    useEffect(() => {
        const fetchRatingsGiven = async () => {
            if (!user?._id) return;
            setLoadingGiven(true);
            try {
                await getRatingsGiven(user._id);
            } finally {
                setLoadingGiven(false);
            }
        };
        fetchRatingsGiven();
    }, []);

    // Cargar valoraciones recibidas
    useEffect(() => {
        const fetchRatingsReceived = async () => {
            if (!user?._id) return;
            setLoadingReceived(true);
            try {
                await getRatingsHistory(user._id);
            } finally {
                setLoadingReceived(false);
            }
        };
        fetchRatingsReceived();
    }, []);

    return (
        <>
            <main className="flex flex-col items-center justify-center flex-1 p-2">
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

                <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                    Valora a las personas que conoces
                </h2>
                <p className="text-gray-500 text-center mb-6">
                    Ayuda a construir una comunidad auténtica dando tu opinión real sobre personas con las que has tenido contacto.
                </p>

                <RatingButton />

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

                {/* Valoraciones RECIBIDAS */}
                <div className="mt-8 w-full">
                    <h3 className="font-semibold text-gray-800 mb-2">
                        Tus últimas valoraciones recibidas
                    </h3>
                    {loadingReceived && (
                        <div className="text-gray-400 py-6 text-center">Cargando valoraciones...</div>
                    )}
                    {!loadingReceived && ratingsToMe.length === 0 && (
                        <div className="text-gray-400 py-6 text-center">Todavía no has recibido valoraciones.</div>
                    )}
                    <ul className="divide-y divide-gray-100 space-y-2">
                        {ratingsToMe.slice(0, 5).map((rating: Rating) => (
                            <RatingCard key={rating._id} {...rating} />
                        ))}
                    </ul>
                </div>

                {/* Valoraciones DADAS */}
                <div className="mt-8 w-full">
                    <h3 className="font-semibold text-gray-800 mb-2">
                        Tus últimas valoraciones emitidas
                    </h3>
                    {loadingGiven && (
                        <div className="text-gray-400 py-6 text-center">Cargando valoraciones...</div>
                    )}
                    {!loadingGiven && ratingsGiven.length === 0 && (
                        <div className="text-gray-400 py-6 text-center">Todavía no has valorado a nadie.</div>
                    )}
                    <ul className="divide-y divide-gray-100 space-y-2">
                        {ratingsGiven.slice(0, 5).map((rating: Rating) => (
                            <RatingCard key={rating._id} {...rating} />
                        ))}
                    </ul>
                </div>
            </main>
        </>
    );
};

export default MeetBack;
