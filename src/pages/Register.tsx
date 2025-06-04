import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { FormAlert } from "../components/FormAlert";
import { PageContainer } from "../components/PageContainer";

export default function Register() {
    const { register } = useAuth();
    const [form, setForm] = useState({
        email: "",
        password: "",
        handle: "",
        displayName: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const valid =
        form.email.match(/^[^@]+@[^@]+\.[a-z]{2,}$/i) &&
        form.password.length >= 6 &&
        form.handle.length >= 3 &&
        form.displayName.length >= 2;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await register(form);
            if (res.success) {
                setTimeout(() => navigate("/login"), 1000);
            } else {
                setError(res.message || "No se pudo registrar el usuario");
            }
        } catch {
            setError("Error de red o del servidor");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <PageContainer>
                <form
                    className="
                    w-full max-w-md
                    p-10 flex flex-col justify-center gap-4
                    border border-white/10
                    transition
                "
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    {/* <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
                        Crea tu cuenta
                    </h1>
                    <p className="text-gray-500 text-center mb-4">
                        Bienvenido a MeetBack
                    </p> */}
                    <div className="flex flex-col items-center gap-2 mb-2">
                        <span className="flex items-center gap-2 text-blue-600">
                            <span className="font-bold text-2xl tracking-wide drop-shadow-sm">
                                Bienvenido a MeetBack
                            </span>
                        </span>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Crea tu cuenta
                        </h1>
                        <p className="text-blue-500 text-base mt-1 mb-0 font-medium">
                            Conecta. Opina. Mejora.
                        </p>
                    </div>

                    <InputField
                        label="Correo electrónico"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        label="Usuario"
                        name="handle"
                        type="text"
                        autoComplete="username"
                        value={form.handle}
                        onChange={handleChange}
                        minLength={3}
                        required
                    />
                    <InputField
                        label="Nombre a mostrar"
                        name="displayName"
                        type="text"
                        value={form.displayName}
                        onChange={handleChange}
                        minLength={2}
                        required
                    />
                    <InputField
                        label="Contraseña"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        value={form.password}
                        onChange={handleChange}
                        minLength={6}
                        required
                    />

                    {error && (
                        <div className="mt-1 -mb-3">
                            <FormAlert message={error} />
                        </div>
                    )}
                    <Button type="submit" disabled={!valid || loading}>
                        {loading ? (
                            <span>Entrando...</span>
                        ) : (
                            "Entrar"
                        )}
                    </Button>
                    {/* <div className="text-center text-gray-500 text-sm mt-2">
                        ¿Ya tienes cuenta?{" "}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Inicia sesión
                        </Link>
                    </div> */}
                    <div className="text-center text-sm">
                        <span className="text-gray-500">¿Ya tienes cuenta?</span>{" "}
                        <Link
                            to="/login"
                            className="
                            text-blue-500 font-semibold hover:text-blue-400
                            transition-colors underline-offset-4 hover:underline
                        "
                        >
                            Inicia sesión
                        </Link>
                    </div>
                </form>
            </PageContainer>
        </>
    );
}
