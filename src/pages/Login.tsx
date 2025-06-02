import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { InputField } from '../components/InputField'
import { Button } from '../components/Button'
import { FormAlert } from '../components/FormAlert'
import { PageContainer } from '../components/PageContainer'

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
        <PageContainer>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white/70 rounded-3xl shadow-xl p-8 flex flex-col gap-6 border border-gray-100"
                autoComplete="off"
            >
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
                    Inicia sesión
                </h1>
                <p className="text-gray-500 text-center mb-4">
                    Bienvenido a MeetBack
                </p>

                <InputField
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    autoComplete="username"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <InputField
                    label="Contraseña"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                {error && <FormAlert message={error} />}

                <Button type="submit" disabled={loading || !email || !password}>
                    {loading ? "Entrando..." : "Entrar"}
                </Button>

                <div className="text-center text-gray-500 text-sm mt-2">
                    ¿No tienes cuenta?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Regístrate
                    </Link>
                </div>
            </form>
        </PageContainer>
    )
}
