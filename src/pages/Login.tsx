import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { InputField } from '../components/InputField'
import { Button } from '../components/Button'
import { FormAlert } from '../components/FormAlert'
import { PageContainer } from '../components/PageContainer'
import { Sparkle } from 'lucide-react'

export default function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('guess@guess.es')
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
                className="
                    w-full max-w-md
                    p-10 flex flex-col justify-center gap-7
                    border border-white/10
                    transition
                "
                autoComplete="off"
            >
                <div className="flex flex-col items-center gap-2 mb-2">
                    <span className="flex items-center gap-2 text-blue-600">
                        <Sparkle size={26} strokeWidth={2.2} />
                        <span className="font-bold text-2xl tracking-wide drop-shadow-sm">
                            MeetBack
                        </span>
                    </span>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Inicia sesión
                    </h1>
                    <p className="text-blue-500 text-base mt-1 mb-0 font-medium">
                        Conecta. Opina. Mejora.
                    </p>
                </div>

                <InputField
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <InputField
                    label="Contraseña"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                {error && (
                    <div className="mt-1 -mb-3">
                        <FormAlert message={error} />
                    </div>
                )}

                <div>

                    <Button
                        type="submit"
                        disabled={loading || !email || !password}
                        className="mt-2"
                    >
                        {loading ? (
                            <span>Entrando...</span>
                        ) : (
                            "Entrar"
                        )}
                    </Button>
                    <button
                        disabled={loading || !email || !password}
                        className="w-full py-2 rounded-xl bg-gray-600 hover:bg-gray-700 text-white font-bold text-lg transition active:scale-95 disabled:opacity-60 mt-2"
                        onClick={() => {
                            setEmail('airuritac@gmail.com')
                            setPassword('12345')
                        }}
                    >
                        [DEV]
                    </button>
                </div>

                <div className="text-center text-sm">
                    <span className="text-gray-500">¿No tienes cuenta?</span>{" "}
                    <Link
                        to="/register"
                        className="
                            text-blue-500 font-semibold hover:text-blue-400
                            transition-colors underline-offset-4 hover:underline
                        "
                    >
                        Regístrate
                    </Link>
                </div>
            </form>
        </PageContainer>
    );
}
