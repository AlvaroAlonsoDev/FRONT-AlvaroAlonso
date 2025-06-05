import { useState } from "react";
import { motion } from "framer-motion";
import { usePostActions } from "../hook/usePostActions";
import { useNavigate } from "react-router-dom";
import TopBarBack from "../components/TopBarBack";

const ideaOptions = [
    {
        idea: "Comparte algo bueno que te pasó hoy",
        ejemplos: [
            "Hoy recibí un mensaje inesperado que me alegró el día 😊",
            "Probé una comida nueva y me encantó.",
            "Terminé un proyecto que me tenía preocupado. ¡Qué alivio!",
        ],
    },
    {
        idea: "¿Qué canción no paras de escuchar últimamente?",
        ejemplos: [
            "No paro de escuchar 'Amorfoda' de Bad Bunny. ¿Alguna recomendación?",
            "Hoy llevo en bucle 'Blinding Lights' de The Weeknd.",
            "Mi mood hoy: 'As It Was' de Harry Styles.",
        ],
    },
    {
        idea: "¿Cuál es tu motivación esta semana?",
        ejemplos: [
            "Esta semana quiero enfocarme en aprender algo nuevo cada día. ¿Y tú?",
            "Mi objetivo: salir a caminar todos los días, aunque sea 10 minutos.",
            "Motivación: terminar ese libro que tengo pendiente 📚",
        ],
    },
    {
        idea: "Da las gracias a alguien (etiquétale si quieres)",
        ejemplos: [
            "Gracias @ana por ayudarme ayer con el proyecto. ¡Eres lo más!",
            "Hoy quiero agradecer a mi familia por su apoyo incondicional.",
            "¡Gracias a todos los que siempre están ahí cuando los necesito!",
        ],
    },
    {
        idea: "Recomienda una serie/peli",
        ejemplos: [
            "Recomiendo 'Dark' en Netflix, ¡no puedes dejar de verla!",
            "Si buscas algo corto, mira 'The End of the F***ing World'.",
            "'Los Mitchell contra las máquinas' para reírte un rato.",
        ],
    },
    {
        idea: "¿Qué te hizo reír hoy?",
        ejemplos: [
            "Un meme que vi esta mañana, todavía me estoy riendo 😂",
            "Mi perro hizo una tontería y no pude parar de reír.",
            "Un comentario random de mi profe en clase, brutal.",
        ],
    },
    {
        idea: "Confiesa una pequeña manía que tengas",
        ejemplos: [
            "Siempre tengo que alinear todo en mi escritorio antes de empezar.",
            "No puedo dormir si la puerta está abierta.",
            "Tengo que escuchar música para poder concentrarme.",
        ],
    },
    {
        idea: "Comparte una meta a corto plazo",
        ejemplos: [
            "Esta semana quiero empezar a levantarme más temprano.",
            "Meta: aprender a cocinar algo nuevo antes del finde.",
            "Voy a intentar no usar redes sociales después de las 10pm.",
        ],
    },
    {
        idea: "¿Cuál fue tu último descubrimiento (app, libro, sitio, etc.)?",
        ejemplos: [
            "Descubrí una cafetería nueva en mi barrio y es top.",
            "Me enganché a la app Headspace para meditar.",
            "Acabo de empezar el libro 'El poder del ahora'. Brutal.",
        ],
    },
    {
        idea: "¿Qué harías si hoy no tuvieras obligaciones?",
        ejemplos: [
            "Me iría de excursión sin mirar el reloj.",
            "Pasaría todo el día jugando videojuegos con amigos.",
            "Haría maratón de mi serie favorita sin culpa.",
        ],
    },
    {
        idea: "Comparte un recuerdo divertido de la infancia",
        ejemplos: [
            "Una vez me disfracé de dinosaurio y no quería quitármelo en todo el día.",
            "En primaria hice una obra de teatro y olvidé mi frase, ¡pero improvisé!",
            "Las guerras de globos de agua con mis primos en verano, inolvidables.",
        ],
    },
    {
        idea: "¿Qué hábito te gustaría incorporar?",
        ejemplos: [
            "Me gustaría empezar a leer 10 minutos antes de dormir.",
            "Quiero aprender a meditar cada mañana.",
            "Mi reto: beber más agua y menos refrescos.",
        ],
    },
    {
        idea: "Pregunta random para tus seguidores",
        ejemplos: [
            "¿Pizza con piña sí o no? Opinen.",
            "¿Madrugar o trasnochar? ¿Qué prefieren?",
            "¿Cuál es su emoji favorito y por qué?",
        ],
    },
    {
        idea: "Cuéntanos tu plan ideal para un domingo",
        ejemplos: [
            "Mi domingo perfecto: brunch, peli y siesta.",
            "Salir a caminar, tomar café y leer al sol.",
            "Juntada con amigos para comer y reírnos de la vida.",
        ],
    },
    {
        idea: "Comparte una frase o reflexión que te guste",
        ejemplos: [
            "‘Hazlo, y si te da miedo, hazlo con miedo’.",
            "Hoy recordé esta frase: ‘No tienes que tenerlo todo resuelto para avanzar’.",
            "‘A veces perderse es la mejor forma de encontrarse’.",
        ],
    },
];

interface CreatePostData {
    content: string;
}

const getRandomEjemplo = (ejemplos: string[]) =>
    ejemplos[Math.floor(Math.random() * ejemplos.length)];

function getRandomItems<T>(arr: T[], n: number): T[] {
    // Copia el array y lo desordena, luego corta los primeros n
    const shuffled = arr.slice().sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
}

const CreatePost = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const { createPost } = usePostActions();
    const [randomIdeas] = useState(() => getRandomItems(ideaOptions, 5));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!content.trim()) return;
        await createPost({ content: content.trim() } as CreatePostData);
        setContent("");
        navigate("/");
    };

    const handleIdeaClick = (ejemplos: string[]) => {
        const ejemplo = getRandomEjemplo(ejemplos);
        setContent(ejemplo);
    };

    return (
        <>
            <TopBarBack text="Crear Post" backUrl="/feed" />
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full p-2 flex flex-col gap-2"
            >
                <form onSubmit={handleSubmit} className="flex flex-col justify-between gap-6">
                    <motion.textarea
                        initial={{ scale: 1 }}
                        whileFocus={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="¿Qué quieres compartir hoy?"
                        className="w-full resize-none bg-transparent border-none outline-none text-lg font-medium text-[#1a237e] placeholder:text-gray-400 transition-all p-4"
                        maxLength={280}
                    />
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        disabled={!content.trim()}
                        type="submit"
                        className={`w-full py-3 rounded-full text-white text-base font-semibold shadow-md transition-all
                        ${!content.trim()
                                ? "bg-[#8bbff9] opacity-60 cursor-not-allowed"
                                : "bg-gradient-to-r from-[#2785fa] to-[#2fbaff] hover:from-[#2674d9] hover:to-[#1ab9eb]"
                            }`}
                    >
                        Publicar
                    </motion.button>
                </form>

                {/* Sugerencias de ideas */}
                <div className="mt-4">
                    <p className="mb-2 text-center text-gray-400 text-sm select-none">¿Necesitas ideas?</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {randomIdeas.map((option) => (
                            <button
                                type="button"
                                key={option.idea}
                                onClick={() => handleIdeaClick(option.ejemplos)}
                                className="px-4 py-1 bg-[#eef6ff] text-[#2574fa] rounded-full text-xs font-medium shadow-sm hover:bg-[#d6ecfd] active:bg-[#b9dafc] transition-all focus:outline-none"
                            >
                                {option.idea}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default CreatePost;
