import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserRound } from "lucide-react";
import type { Rating } from "../store/slices/ratingSlice";
import { timeAgo } from "../utils/functions";
import { ExpandableText } from "./ExpandableText";
import { Link } from "react-router-dom";

export function RatingsFromMe({ ratingsHistory, text }: { ratingsHistory: Rating[], text: string }) {
    const [showAll, setShowAll] = useState(false);
    if (!ratingsHistory?.length) return null;

    // Separar los primeros 3 y los extras
    const firstThree = ratingsHistory.slice(0, 3);
    const extras = ratingsHistory.slice(3);

    return (
        <div className="flex flex-col justify-center flex-1 p-2">
            {/* <div className="font-semibold text-gray-700 mb-2">{text}</div> */}
            <div className="flex items-center justify-between">
                <span className="font-semibold text-lg text-gray-800">{text}</span>
            </div>
            <div className="flex flex-col gap-2">
                {/* Siempre visibles */}
                {firstThree.map((r) => (
                    <RatingCard key={r._id} {...r} />
                ))}

                {/* Animar los extras */}
                <AnimatePresence initial={false}>
                    {showAll && extras.map((r) => (
                        <motion.div
                            key={r._id}
                            initial={{ opacity: 0, height: 0, scale: 0.98, y: -8 }}
                            animate={{ opacity: 1, height: "auto", scale: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0, scale: 0.98, y: -8 }}
                            transition={{ duration: 0.32, ease: [0.42, 0, 0.58, 1] }}
                            style={{ overflow: "hidden" }}
                        >
                            <RatingCard {...r} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            {ratingsHistory.length > 3 && (
                <motion.button
                    layout
                    className="mx-auto block text-blue-600 font-medium text-sm px-4 py-1 rounded-full bg-blue-50 hover:bg-blue-100 transition"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAll((v) => !v)}
                    aria-expanded={showAll}
                >
                    <motion.span
                        key={showAll ? "less" : "more"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.18 }}
                    >
                        {showAll ? "Ver menos" : "Ver más"}
                    </motion.span>
                </motion.button>
            )}
        </div>
    );
}

export function RatingCard(rating: Rating) {
    return (
        <div>
            <Link to={`/profile/${rating.fromUser?.handle || rating.toUser?.handle}?from=/`} className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {rating.toUser?.avatar || rating.fromUser?.avatar ? (
                        <img src={rating.toUser?.avatar || rating.fromUser?.avatar} alt="avatar-user" className="w-full h-full object-cover" />
                    ) : (
                        <UserRound size={20} className="text-gray-300" />
                    )}
                </div>
                <div className="font-medium text-gray-800">{rating.toUser?.displayName || rating.toUser?.handle || rating.fromUser?.displayName || rating.fromUser?.handle}</div>
                <span className="text-xs text-gray-400">
                    {timeAgo(rating.createdAt)}
                </span>
            </Link>

            <div className="flex gap-2 text-xs mb-1 flex-wrap">
                {Object.entries(rating.ratings).map(([k, v]) => (
                    <span key={k} className="bg-blue-100 text-blue-700 rounded px-2 py-0.5">{k}: {v}</span>
                ))}
            </div>
            {rating.comment && (
                <div className="text-gray-600 text-sm mt-2">
                    <ExpandableText text={rating.comment} maxLines={4} />
                </div>
            )
            }
        </div>
    );
}
