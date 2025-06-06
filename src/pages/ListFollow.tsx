import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TopBarBack from "../components/TopBarBack";
import ComingSoon from "../components/ComingSoon";

type User = {
    _id: string;
    displayName: string;
    handle: string;
    avatar?: string;
};

const fetchFollows = async (
    type: "followers" | "following",
    userId: string
): Promise<User[]> => {
    // Simulación de delay y datos
    return new Promise((resolve) =>
        setTimeout(
            () =>
                resolve([
                    {
                        _id: "1",
                        displayName: "Usuario 1",
                        handle: "@usuario1",
                        avatar: undefined,
                    },
                    {
                        _id: "2",
                        displayName: "Usuario 2",
                        handle: "@usuario2",
                        avatar: undefined,
                    },
                ]),
            500
        )
    );
};

const ListFollow = () => {
    const params = useParams();

    const type = params.key as "followers" | "following" | undefined;
    const userId = params.id as string | undefined;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);


    useEffect(() => {
        if (!type || !userId) {
            setError("URL inválida");
            setLoading(false);
            return;
        }
        if (type !== "followers" && type !== "following") {
            setError("Tipo inválido");
            setLoading(false);
            return;
        }
        setLoading(true);
        fetchFollows(type, userId)
            .then((data) => {
                setUsers(data);
                setError(null);
            })
            .catch(() => setError("Error al cargar la lista"))
            .finally(() => setLoading(false));
    }, [type, userId]);

    const isMe = userId === "me";
    const title =
        type === "followers"
            ? isMe
                ? "Tus seguidores"
                : "Seguidores"
            : isMe
                ? "Tus seguidos"
                : "Siguiendo";

    return (
        <div className="w-full flex flex-col gap-2">
            <TopBarBack
                text={title}
            />
            <ComingSoon
                title="Esta sección está en construcción"
                subtitle="Pronto podrás ver los seguidores y seguidos de este usuario."
            />
        </div>
    );
};

export default ListFollow;
