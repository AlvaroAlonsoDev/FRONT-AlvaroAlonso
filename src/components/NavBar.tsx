import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function NavBar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
                {/* Logo y título */}
                <Link to="/" className="flex items-center space-x-3">
                    <img src="/icon-192x192.png" alt="MeetBack logo" className="h-8 w-8 rounded" />
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-gray-900">
                        MeetBack
                    </span>
                </Link>

                {/* Botón hamburguesa */}
                <button
                    onClick={() => setMenuOpen(v => !v)}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-controls="navbar-menu"
                    aria-expanded={menuOpen}
                >
                    <span className="sr-only">Abrir menú principal</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>

                {/* Menú */}
                <div className={`${menuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-menu">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                        <li>
                            <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0">
                                Inicio
                            </Link>
                        </li>
                        {user && (
                            <li>
                                <Link to="/profile" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                                    Perfil
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Área derecha: usuario o login */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link to="/profile" className="flex items-center gap-2 hover:underline">
                                <img
                                    src={user.avatar || "https://cdn-icons-png.freepik.com/256/9347/9347589.png"}
                                    alt={user.displayName || user.handle}
                                    className="w-8 h-8 rounded-full border border-gray-300 object-cover"
                                />
                                <span className="hidden sm:block font-medium text-gray-900">
                                    {user.displayName || user.handle || user.email}
                                </span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:underline text-gray-900">Login</Link>
                            <Link to="/register" className="hover:underline text-gray-900">Registro</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
