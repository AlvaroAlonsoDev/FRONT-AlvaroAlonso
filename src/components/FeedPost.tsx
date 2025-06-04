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
import { BsTrash3 } from "react-icons/bs";

function timeAgo(date: string | Date): string {
    let str = formatDistanceToNow(new Date(date), { addSuffix: true, locale: es });
    return str.replace('alrededor de ', '');
}

// TODO: Arreglar any
export function FeedPost({ post, createPost }: { post: Post, createPost: any }) {
    const navigate = useNavigate();
    const [isOpenReply, setIsOpenReply] = useState(false);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [reply, setReply] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const replyRef = useRef<HTMLDivElement>(null);
    const startPointRef = useRef<{ x: number; y: number } | null>(null);

    // @ts-ignore
    useClickOutside(replyRef, () => setIsOpenReply(false), isOpenReply);

    // Auto-focus cuando se abre
    useEffect(() => {
        if (isOpenReply && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpenReply]);

    const { deletePost } = usePostActions();
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();
    const handleLongPress = async () => {
        setIsOpenDialog(true);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        const tag = (e.target as HTMLElement).tagName.toLowerCase();
        if (["button", "a", "svg", "img", "span", "path", "input", "textarea"].includes(tag)) return;
        // Guarda coordenadas iniciales
        startPointRef.current = { x: e.clientX, y: e.clientY };
        timerRef.current = setTimeout(handleLongPress, 700);

        // Listener para detectar movimiento
        const handleMouseMove = (moveEvent: MouseEvent) => {
            if (!startPointRef.current) return;
            const dx = Math.abs(moveEvent.clientX - startPointRef.current.x);
            const dy = Math.abs(moveEvent.clientY - startPointRef.current.y);
            if (dx > 5 || dy > 5) { // umbral de 5px, ajusta si quieres
                if (timerRef.current) clearTimeout(timerRef.current);
                document.removeEventListener("mousemove", handleMouseMove);
            }
        };
        document.addEventListener("mousemove", handleMouseMove);

        // Limpia listener en mouseup
        const handleMouseUpDoc = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUpDoc);
        };
        document.addEventListener("mouseup", handleMouseUpDoc);
    };

    const handleMouseUp = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        startPointRef.current = null;
    };

    // Soporte móvil
    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        startPointRef.current = { x: touch.clientX, y: touch.clientY };
        timerRef.current = setTimeout(handleLongPress, 700);

        // Listener para detectar movimiento
        const handleTouchMove = (moveEvent: TouchEvent) => {
            if (!startPointRef.current) return;
            const touchMove = moveEvent.touches[0];
            const dx = Math.abs(touchMove.clientX - startPointRef.current.x);
            const dy = Math.abs(touchMove.clientY - startPointRef.current.y);
            if (dx > 5 || dy > 5) {
                if (timerRef.current) clearTimeout(timerRef.current);
                document.removeEventListener("touchmove", handleTouchMove);
            }
        };
        document.addEventListener("touchmove", handleTouchMove);

        // Limpia listener en touchend
        const handleTouchEndDoc = () => {
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEndDoc);
        };
        document.addEventListener("touchend", handleTouchEndDoc);
    };

    const handleTouchEnd = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        startPointRef.current = null;
    };


    const handleCardClick = (e: React.MouseEvent) => {
        const tag = (e.target as HTMLElement).tagName.toLowerCase();
        if (["button", "a", "svg", "img", "span", "path", "input", "textarea"].includes(tag)) return;
        navigate(`/post/${post._id}`);
    };

    // TODO: Arreglar que al press replyButton si esta abierto que no cierre
    const handleReplyBtn = () => setTimeout(() => {
        if (isOpenReply) return;
        setIsOpenReply((v) => !v);
    }, 0);

    return (
        <div className="bg-white backdrop-blur-md rounded shadow-[0_2px_8px_0_rgba(30,41,59,0.04)] hover:shadow-[0_2px_6px_0_rgba(30,41,59,0.08)]">
            {post.replyTo && (
                <Link to={`/post/${post.replyTo._id}`} className="flex items-center gap-2 mb-1">
                    {/* Barra azul sutil, perfectamente alineada */}
                    <div className="h-8 w-1 rounded bg-blue-500 opacity-80 mr-1"></div>
                    <img
                        src={post.replyTo.author.avatar || "/default-avatar.png"}
                        alt={post.replyTo.author.displayName}
                        className="w-5 h-5 rounded-full border border-gray-100 object-cover"
                        loading="lazy"
                    />
                    <Link
                        to={`/profile/${post.replyTo.author.handle}`}
                        className="text-xs font-medium text-blue-700 hover:underline truncate"
                        tabIndex={-1}
                    >
                        {post.replyTo.author.displayName}
                    </Link>
                    <span className="text-xs text-gray-400 truncate italic">
                        {post.replyTo.content.length > 60
                            ? post.replyTo.content.slice(0, 60) + "…"
                            : post.replyTo.content}
                    </span>
                </Link>
            )}

            <article
                onClick={handleCardClick}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                tabIndex={0}
                role="button"
                className="grid grid-cols-[48px_1fr] auto-cols-auto gap-3 py-3 px-4 items-start min-h-0 transition ursor-pointer relative"
            >
                <Link to={`/profile/${post.author.handle}`}>
                    <img
                        src={post.author.avatar || "/default-avatar.png"}
                        alt={post.author.displayName}
                        className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm"
                        loading="lazy"
                        style={{ cursor: "pointer" }}
                    />
                </Link>
                <div className="flex-1 min-w-0">
                    {/* Top row */}
                    <div className="flex items-start justify-between w-full">
                        <div className="grid gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                                <Link
                                    to={`/profile/${post.author.handle}`}
                                    className="font-semibold text-base text-gray-900 truncate cursor-pointer hover:underline"
                                >
                                    {post.author.displayName}
                                </Link>
                                <span className="text-xs text-gray-400 truncate">
                                    {timeAgo(post.createdAt)}
                                </span>
                            </div>
                            <div className="text-[15px] text-gray-800 leading-relaxed break-words whitespace-pre-line pt-0.5">
                                {post.content}
                            </div>
                        </div>
                        <div className="flex flex-col justify-between h-full">
                            <LikeButton post={post} />
                            <ReplyButton action={handleReplyBtn} isOpenReply={isOpenReply} />
                        </div>
                    </div>

                    {/* Media */}
                    {post.media && post.media.length > 0 && (
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
                    )}
                </div>


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

                {/* DIALOG */}
                <Dialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)} className="z-50">
                    <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClose={() => setIsOpenDialog(false)} />
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <DialogPanel
                            onClick={stopPropagation}
                            className="relative mx-4 w-full max-w-sm rounded-2xl bg-white/90 p-8 shadow-2xl ring-1 ring-black/10 backdrop-blur-lg"
                        >
                            <div className="flex flex-col items-center gap-3">
                                <div className="flex items-center justify-center rounded-full bg-red-50 p-4 mb-2">
                                    <BsTrash3 className="h-7 w-7 text-red-500" />
                                </div>
                                <DialogTitle className="text-lg font-bold text-gray-900 text-center">
                                    ¿Eliminar publicación?
                                </DialogTitle>
                                <p className="mt-1 text-center text-gray-500 text-base">
                                    Esta acción no se puede deshacer.<br />¿Quieres borrar este post?
                                </p>
                            </div>
                            <div className="mt-7 flex flex-col sm:flex-row-reverse gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        deletePost(post._id)
                                        setIsOpenDialog(false);
                                    }}
                                    className="inline-flex justify-center rounded-xl bg-red-600 px-5 py-2 text-base font-semibold text-white shadow hover:bg-red-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                                >
                                    Eliminar
                                </button>
                                <button
                                    type="button"
                                    autoFocus
                                    onClick={() => setIsOpenDialog(false)}
                                    className="inline-flex justify-center rounded-xl bg-white/80 px-5 py-2 text-base font-semibold text-gray-700 hover:bg-gray-100 transition shadow ring-1 ring-inset ring-gray-200"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            </article>
        </div>
    );
}
