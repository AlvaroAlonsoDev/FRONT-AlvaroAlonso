import { useParams } from "react-router-dom";
import TopBarBack from "../components/TopBarBack";
import ComingSoon from "../components/ComingSoon";

const ListFollow = () => {
    const params = useParams();

    const type = params.key as "followers" | "following" | undefined;
    const userId = params.id as string | undefined;

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
