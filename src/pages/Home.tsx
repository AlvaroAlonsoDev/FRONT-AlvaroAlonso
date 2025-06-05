import { useEffect, useRef, useState } from "react";
import { CardPost } from "../components/CardPost";
import { motion, AnimatePresence } from "framer-motion";
import { useFeed } from "../hook/useFeed";
import { usePostActions } from "../hook/usePostActions";
import { useAuth } from "../contexts/AuthContext";
import { usePopular } from "../hook/usePopular";
import debounce from "lodash.debounce";

// Tabs
const TAB_OPTIONS = [
    { key: "feed", label: "Feed" },
    { key: "popular", label: "Popular" },
] as const;

type TabKey = typeof TAB_OPTIONS[number]["key"];

const postVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.96 },
};

const transition = {
    duration: 0.35,
    ease: [0.42, 0, 0.58, 1],
};

export default function Home() {
    const { user } = useAuth();
    const { createPost } = usePostActions();
    const [tab, setTab] = useState<TabKey>("feed");
    const isFirstLoad = useRef(true);
    const { feed, loading, error, refreshFeed } = useFeed();
    const { popularPosts, loading: loadingPopular, error: errorPopular, refreshPopular } = usePopular();

    const debouncedRefresh = useRef(
        debounce((tab) => {
            if (tab === "feed") {
                refreshFeed();
            } else if (tab === "popular") {
                refreshPopular();
            }
        }, 400)
    ).current;

    useEffect(() => {
        if (isFirstLoad.current) {
            // Primera carga: petición inmediata
            if (tab === "feed") refreshFeed();
            else if (tab === "popular") refreshPopular();
            isFirstLoad.current = false;
        } else {
            // Cambios siguientes: debounced
            debouncedRefresh(tab);
        }
        // Cleanup debounce
        return () => debouncedRefresh.cancel();
    }, [tab]);

    return (
        <>
            {/* Tabs */}
            <header className="bg-white/90 backdrop-blur border-b border-gray-200">
                <div className="max-w-2xl mx-auto flex px-4 relative">
                    {TAB_OPTIONS.map((option) => (
                        <button
                            key={option.key}
                            className={`
                                flex-1 pt-4 text-base font-semibold text-center relative outline-none
                                ${tab === option.key ? "text-blue-600" : "text-gray-400"}
                                transition-colors
                                focus-visible:ring-2 focus-visible:ring-blue-500
                            `}
                            style={{ WebkitTapHighlightColor: "transparent" }}
                            onClick={() => setTab(option.key)}
                            type="button"
                            aria-selected={tab === option.key}
                        >
                            <span className="relative flex flex-col items-center">
                                {option.label}
                                {tab === option.key && (
                                    <motion.span
                                        layoutId="underline"
                                        className="
                                            mt-1
                                            block
                                            h-[2.5px]
                                            w-full
                                            rounded-full
                                            bg-blue-600
                                        "
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 32,
                                        }}
                                    />
                                )}
                            </span>
                        </button>
                    ))}
                </div>
            </header>

            {/* Content */}

            <motion.section
                className="mx-auto"
                layout
                transition={{ layout: { duration: 0.33, ease: [0.42, 0, 0.58, 1] } }}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {tab === "feed" && (
                        <motion.div
                            key="feed"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={transition}
                            className="w-full"
                        >
                            {error && (
                                <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-5 shadow">
                                    {error}
                                </div>
                            )}
                            {!loading && feed.length === 0 && (
                                <div className="text-center text-gray-300 font-medium py-14 select-none">
                                    No hay publicaciones aún.
                                </div>
                            )}
                            <div className="flex flex-col gap-1 mt-1">
                                <AnimatePresence initial={false}>
                                    {feed.map((post) => (
                                        <motion.div
                                            key={post._id}
                                            layout
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            variants={postVariants}
                                            transition={transition}
                                            style={{ willChange: "transform, opacity" }}
                                        >
                                            <CardPost post={post} createPost={createPost} userId={user?._id} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                    {tab === "popular" && (
                        <motion.div
                            key="feed"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={transition}
                            className="w-full"
                        >
                            {errorPopular && (
                                <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-5 shadow">
                                    {error}
                                </div>
                            )}
                            {!loadingPopular && popularPosts.length === 0 && (
                                <div className="text-center text-gray-300 font-medium py-14 select-none">
                                    No hay publicaciones aún.
                                </div>
                            )}
                            <div className="flex flex-col gap-1 mt-1">
                                <AnimatePresence initial={false}>
                                    {popularPosts.map((post) =>
                                        post.author._id === user?._id ? null : (
                                            <motion.div
                                                key={post._id}
                                                layout
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                variants={postVariants}
                                                transition={transition}
                                                style={{ willChange: "transform, opacity" }}
                                            >
                                                <CardPost post={post} createPost={createPost} userId={user?._id} />
                                            </motion.div>
                                        )
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.section>
        </>
    );
}
