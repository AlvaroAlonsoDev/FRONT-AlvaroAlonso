import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import { motion, AnimatePresence } from "framer-motion";
import ReplyButton from "./ReplyButton";
import { ReplyBox } from "./ReplyBox";
import type { Post } from "../store/slices/feedSlice";
import { useClickOutside } from "../hook/useClickOutside";
import { usePostActions } from "../hook/usePostActions";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "./Dialog";
import DeletePostButton from "./DeletePostButton";

function timeAgo(date: string | Date): string {
    let str = formatDistanceToNow(new Date(date), { addSuffix: true, locale: es });
    return str.replace('alrededor de ', '');
}

// TODO: Arreglar any
export function FeedPost({ post, createPost }: { post: Post, createPost: any }) {
    const navigate = useNavigate();
    const [isOpenReply, setIsOpenReply] = useState(false);
    const [isOpenDialogDeletePost, setIsOpenDialogDeletePost] = useState(false);
    const [reply, setReply] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const replyRef = useRef<HTMLDivElement>(null);
    const isReply = !!post.replyTo;

    // @ts-ignore
    useClickOutside(replyRef, () => setIsOpenReply(false), isOpenReply);

    // Auto-focus cuando se abre
    useEffect(() => {
        if (isOpenReply && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpenReply]);

    const { deletePost } = usePostActions();


    // TODO: Arreglar que al press replyButton si esta abierto que no cierre
    const handleReplyBtn = () => setTimeout(() => {
        if (isOpenReply) return;
        setIsOpenReply((v) => !v);
    }, 0);

    const handleCardClick = (e: React.MouseEvent) => {
        const tag = (e.target as HTMLElement).tagName.toLowerCase();
        if (["button", "a", "svg", "img", "span", "path", "input", "textarea"].includes(tag)) return;
        navigate(`/post/${post._id}`);
    };

    return (
        <>
            <article
                onClick={handleCardClick}
                tabIndex={0}
                role="button"
                className={`
        group relative flex flex-col gap-0 rounded-2xl shadow-md bg-white/90 
        transition hover:shadow-lg cursor-pointer p-0 
        ${isReply ? "pt-0 pb-4" : "py-4"}
      `}
            >
                {/* Si es respuesta, dibuja la flecha y la referencia */}
                {isReply && (
                    <div className="absolute top-2 z-30 pointer-events-none">
                        <motion.svg
                            width="30"
                            height="76"
                            viewBox="0 0 30 82"
                            fill="none"
                            className="block"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.07, ease: "easeOut" }}
                            style={{
                                filter: "drop-shadow(0 2px 6px rgba(37,99,235,0.08))",
                            }}
                        >
                            {/* Gradiente: de azul claro (#60a5fa) a azul eléctrico (#2563eb) */}
                            <defs>
                                <linearGradient id="arrowGradient" x1="15" y1="6" x2="26" y2="78" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />   {/* Transparente al principio */}
                                    <stop offset="100%" stopColor="#60a5fa" stopOpacity="1" /> {/* Azul fuerte al final */}
                                </linearGradient>
                            </defs>

                            {/* Línea curva con gradiente */}
                            <motion.path
                                d="M15 6 C15 28 15 52 15 66 Q15 78 26 78"
                                stroke="url(#arrowGradient)"
                                strokeWidth="2.8"
                                fill="none"
                                strokeLinecap="round"
                                opacity="0.92"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                            />
                        </motion.svg>
                    </div>

                )}


                {/* Referencia al post de arriba */}
                {isReply && (
                    <Link
                        to={`/post/${post.replyTo._id}`}
                        className={`
            flex items-center gap-2 rounded-t-2xl bg-blue-50/60 border-b border-blue-100
            px-12 py-2 min-h-[44px] hover:bg-blue-100/50 transition-colors
            relative z-20
          `}
                        tabIndex={-1}
                    >
                        <img
                            src={post.replyTo.author.avatar || "/default-avatar.png"}
                            alt={post.replyTo.author.displayName}
                            className="w-7 h-7 rounded-full border border-blue-200 object-cover"
                            loading="lazy"
                        />

                        <p className="text-xs text-gray-500 italic flex-1 line-clamp-2">
                            <span className="text-xs font-semibold text-blue-700 hover:underline whitespace-nowrap mr-1">
                                {post.replyTo.author.displayName}
                            </span>
                            {post.replyTo.content}
                        </p>
                    </Link>
                )}

                {/* Main body: avatar + contenido */}
                <div
                    className={`
          flex items-start gap-4 w-full px-6 pt-4 pb-0
          ${isReply ? "" : "pt-0"}
        `}
                >
                    <Link to={`/profile/${post.author.handle}`} tabIndex={-1}>
                        <img
                            src={post.author.avatar || "/default-avatar.png"}
                            alt={post.author.displayName}
                            className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm"
                            loading="lazy"
                        />
                    </Link>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between w-full">
                            <div className="grid gap-2 min-w-0">
                                <div className="flex items-center gap-2 min-w-0">
                                    <Link
                                        to={`/profile/${post.author.handle}`}
                                        className="font-semibold text-[17px] text-gray-900 truncate hover:underline"
                                    >
                                        {post.author.displayName}
                                    </Link>
                                    <span className="text-xs text-gray-400 truncate">
                                        {timeAgo(post.createdAt)}
                                    </span>
                                </div>
                                <div className="text-[15px] text-gray-800 leading-relaxed whitespace-pre-line break-words pt-0.5">
                                    {post.content}
                                </div>
                            </div>
                            {/* Actions */}
                            <div className="flex flex-col gap-2 ml-2">
                                <LikeButton post={post} />
                                <ReplyButton action={handleReplyBtn} isOpenReply={isOpenReply} />
                                <DeletePostButton
                                    action={() => setIsOpenDialogDeletePost(!isOpenDialogDeletePost)}
                                    post={post}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Media */}
                {/* {post.media && post.media.length > 0 && (
                    <div className={`grid gap-2 mt-2 ${post.media.length === 1 ? "" : "grid-cols-2"}`}>
                        {post.media.slice(0, 4).map((img, i) => {
                            const isLast = i === (post.media?.length ?? 0) - 1;
                            const isOdd = (post.media?.length ?? 0) % 2 === 1;
                            const spanCols = isLast && isOdd && (post.media?.length ?? 0) > 1;
                            return (
                                <img
                                    key={img}
                                    src={img}
                                    alt={`media-${i}`}
                                    className={`
                                        w-full object-cover rounded-xl
                                        max-h-72 transition
                                        ${spanCols ? "col-span-2" : ""}
                                    `}
                                    loading="lazy"
                                />
                            );
                        })}
                    </div>
                )} */}

                {/* --- Reply input: justo aquí abajo --- */}
                <AnimatePresence initial={false}>
                    {isOpenReply && (
                        <motion.div
                            ref={replyRef}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden col-span-2"
                        >
                            <div className="w-full border-t border-gray-200 mb-0.5" />
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    if (reply.trim()) {
                                        // tu lógica para enviar respuesta
                                        setReply('');
                                        setIsOpenReply(false);
                                    }
                                }}
                                className="px-1 py-3"
                            >
                                <ReplyBox
                                    value={reply}
                                    setValue={setReply}
                                    onSend={() => {
                                        createPost({ content: reply, replyTo: post._id });
                                        setReply('');
                                        setIsOpenReply(false);
                                    }}
                                />
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </article>
            {/* DIALOG */}
            <Dialog open={isOpenDialogDeletePost} onClose={() => setIsOpenDialogDeletePost(false)} className="z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClose={() => setIsOpenDialogDeletePost(false)} />
                <DialogPanel className="relative w-full max-w-xs mx-auto rounded-2xl bg-white p-0 shadow-2xl ring-1 ring-black/10">
                    <div className="px-6 pt-6 pb-3">
                        <DialogTitle className="text-lg font-semibold text-center text-black">
                            Eliminar post
                        </DialogTitle>
                        <p className="mt-2 text-center text-gray-600 text-base">
                            ¿Estás seguro de que quieres eliminar este post?
                        </p>
                    </div>
                    <div className="flex border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => setIsOpenDialogDeletePost(false)}
                            className="w-1/2 py-3 text-base font-semibold text-blue-600 hover:bg-gray-100 rounded-bl-2xl transition border-r"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                deletePost(post._id);
                                setIsOpenDialogDeletePost(false);
                            }}
                            className="w-1/2 py-3 text-base font-semibold text-red-600 hover:bg-red-50 rounded-br-2xl transition"
                        >
                            Eliminar
                        </button>
                    </div>
                </DialogPanel>
            </Dialog>
        </>
    );
}
