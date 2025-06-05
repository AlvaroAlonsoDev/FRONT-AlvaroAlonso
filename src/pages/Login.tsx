import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { InputField } from '../components/InputField'
import { Button } from '../components/Button'
import { FormAlert } from '../components/FormAlert'
import { PageContainer } from '../components/PageContainer'
import { Sparkle } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion";

const loadingMessages = [
    // Profesional y confiable
    "Cargando tu sesión…",
    "Verificando tus datos…",
    "¿Será tu conexión? 🤔",
    "¿El servidor fue por café?",
    "Dale un segundo…",
    "¿Seguro que era tu contraseña?",
    "Vaya, parece que sí lo era…",
    "¿O no? 🤨",
    "Esto ya tarda, ¿eh?",
    "¿Probaste apagar y encender? 😅",
    "Esto ya es sospechoso…",
    "Voy a preguntar al servidor…",
    "Nada, sigue igual…",
    "Bueno, paciencia, que todo llega.",
    "Cargando buenas vibras…",
    "Pues no sé qué pasa…",
    "Tendre que reiniciar la página…",
    "3… 2… 1…",
];

export default function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('guess@guess.es')
    const [password, setPassword] = useState('12345')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

    useEffect(() => {
        if (loading) {
            setLoadingMsgIdx(0); // Reinicia mensaje al cargar
            const interval = setInterval(() => {
                setLoadingMsgIdx(prev => {
                    if (prev < loadingMessages.length - 1) {
                        return prev + 1;
                    } else {
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                        return prev;
                    }
                });
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [loading]);

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
                    w-full
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
                        className="mt-2 w-full h-11 flex items-center justify-center text-base font-semibold"
                    >
                        {loading ? (
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={loadingMsgIdx}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
                                    exit={{ opacity: 0, y: -4, transition: { duration: 0.2 } }}
                                    className="flex items-center gap-2"
                                >
                                    <svg
                                        className="animate-spin h-4 w-4 text-white opacity-70"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12" cy="12" r="10"
                                            stroke="currentColor" strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        />
                                    </svg>
                                    {loadingMessages[loadingMsgIdx]}
                                </motion.span>
                            </AnimatePresence>
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
