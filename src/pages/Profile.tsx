import TopBarBack from '../components/TopBarBack'
import { useParams } from 'react-router-dom';
import ComingSoon from '../components/ComingSoon';

const Profile = () => {
    const params = useParams();
    const handle = params.id as string | undefined;
    return (
        <div className="w-full flex flex-col gap-2">
            <TopBarBack
                text={`Perfil de @${handle || 'desconocido'}`}
            />
            <ComingSoon
                title="Esta sección está en construcción"
                subtitle="Pronto podrás ver el perfil de este usuario"
            />
        </div>
    )
}

export default Profile