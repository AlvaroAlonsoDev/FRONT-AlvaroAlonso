import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function NavBar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <nav className="bg-blue-800 text-white px-6 py-4 flex items-center">
            <Link to="/" className="font-bold text-xl">MeetBack</Link>

            {user && (
                <Link to="/profile" className="ml-8 hover:underline">
                    Perfil
                </Link>
            )}

            {/* Espacio automático a la derecha */}
            <div className="flex-1" />

            {user ? (
                <div className="flex items-center gap-4">
                    <span className="font-medium">
                        {user.displayName || user.handle || user.email}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <Link to="/login" className="hover:underline">Login</Link>
                    <Link to="/register" className="hover:underline">Registro</Link>
                </div>
            )}
        </nav>
    )
}
