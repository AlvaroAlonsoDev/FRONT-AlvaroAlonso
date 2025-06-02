import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('airuritac@gmail.com')
    const [password, setPassword] = useState('12345')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setLoading(true)
        const res = await login(email, password)
        setLoading(false)
        if (res.success) {
            navigate('/')
        } else {
            setError(res.message)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 max-w-sm mx-auto">
            <input
                className="border p-2 rounded"
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="username"
            />
            <input
                className="border p-2 rounded"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
            />
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-700 text-white rounded px-4 py-2"
            >
                {loading ? "Entrando..." : "Entrar"}
            </button>
            {error && <div className="text-red-500">{error}</div>}
        </form>
    )
}
