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
    const [success, setSuccess] = useState<string | null>(null);
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
        setSuccess(null);
        setLoading(true);
        try {
            const res = await register(form);
            if (res.success) {
                setSuccess("¡Registro exitoso! Redirigiendo…");
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
        <PageContainer>
            <form
                className="w-full max-w-md bg-white/70 rounded-3xl shadow-xl p-8 flex flex-col gap-6 border border-gray-100"
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
                    Crea tu cuenta
                </h1>
                <p className="text-gray-500 text-center mb-4">
                    Bienvenido a MeetBack
                </p>

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

                {error && <FormAlert message={error} />}
                {success && <FormAlert message={success} type="success" />}

                <Button type="submit" disabled={!valid || loading}>
                    {loading ? "Registrando…" : "Crear cuenta"}
                </Button>
                <div className="text-center text-gray-500 text-sm mt-2">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Inicia sesión
                    </Link>
                </div>
            </form>
        </PageContainer>
    );
}
