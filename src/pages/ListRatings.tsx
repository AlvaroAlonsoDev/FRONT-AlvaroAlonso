import { useParams } from "react-router-dom";
import TopBarBack from "../components/TopBarBack";
import ComingSoon from "../components/ComingSoon";


const ListRatings = () => {
    const params = useParams();
    const userId = params.id as string | undefined;
    return (
        <div className="w-full flex flex-col gap-2">
            <TopBarBack
                text={`Lista de Valoraciones de ${userId}`}
            />
            <ComingSoon
                title="Esta sección está en construcción"
                subtitle="Pronto podrás ver las valoraciones de este usuario."
            />
        </div>
    );
};

export default ListRatings;
