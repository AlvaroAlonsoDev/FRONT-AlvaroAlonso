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
        <div className="bg-white backdrop-blur-md rounded shadow-[0_2px_8px_0_rgba(30,41,59,0.04)] hover:shadow-[0_2px_6px_0_rgba(30,41,59,0.08)]">
            {post.replyTo && (
                <span className="flex items-center gap-2 mb-1">
                    {/* Barra azul sutil, perfectamente alineada */}
                    <div className="h-8 w-1 rounded bg-blue-500 opacity-80 mr-1"></div>
                    <Link to={`/post/${post.replyTo._id}`}>
                        <img
                            src={post.replyTo.author.avatar || "/default-avatar.png"}
                            alt={post.replyTo.author.displayName}
                            className="w-5 h-5 rounded-full border border-gray-100 object-cover"
                            loading="lazy"
                        />
                    </Link>
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
                </span>
            )}

            <article
                onClick={handleCardClick}
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
                            <DeletePostButton action={() => setIsOpenDialogDeletePost(!isOpenDialogDeletePost)} post={post} />
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

            </article>
        </div>
    );
}
