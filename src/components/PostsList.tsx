import { useState } from "react";
import { SmoothCollapse } from "./SmoothCollapse";

type Post = {
    _id: string;
    content: string;
    createdAt: string;
};

export function PostsList({ posts }: { posts: Post[] }) {
    const [showAll, setShowAll] = useState(false);
    if (!posts?.length) return null;

    const firstThree = posts.slice(0, 3);
    const extras = posts.slice(3);

    return (
        <div className="mt-3">
            <div className="font-semibold text-gray-700 mb-2">Mis publicaciones</div>
            <div className="flex flex-col gap-3">
                {firstThree.map((post) => (
                    <PostCard key={post._id} {...post} />
                ))}
                <SmoothCollapse open={showAll}>
                    <div className="flex flex-col gap-3">
                        {extras.map((post) => (
                            <PostCard key={post._id} {...post} />
                        ))}
                    </div>
                </SmoothCollapse>
            </div>
            {posts.length > 3 && (
                <button
                    className="mt-2 mx-auto block text-blue-600 font-medium text-sm px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-100 transition shadow"
                    onClick={() => setShowAll((v) => !v)}
                >
                    {showAll ? "Ver menos" : "Ver más"}
                </button>
            )}
        </div>
    );
}

function PostCard({ content, createdAt }: Post) {
    return (
        <div className="bg-white rounded-xl shadow-sm px-4 py-3 border border-gray-100 transition-shadow hover:shadow-md">
            <div className="text-gray-800">{content}</div>
            <div className="text-gray-400 text-xs mt-1">
                {new Date(createdAt).toLocaleString()}
            </div>
        </div>
    );
}
