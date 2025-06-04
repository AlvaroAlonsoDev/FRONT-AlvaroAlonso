type Post = {
    _id: string;
    content: string;
    createdAt: string;
};

export function PostsList({ posts, text }: { posts: Post[], text: string }) {
    if (!posts?.length) return null;

    const firstThree = posts.slice(0, 3);

    return (
        <>
            <div className="font-semibold text-gray-700">{text}</div>
            <div className="flex flex-col gap-2">
                {firstThree.map((post) => (
                    <PostCard key={post._id} {...post} />
                ))}
            </div>
        </>
    );
}

function PostCard({ content, createdAt }: Post) {
    return (
        <div className="rounded-xl px-4 py-3 border border-gray-100 transition-shadow hover:shadow-md">
            <div className="text-gray-800">{content}</div>
            <div className="text-gray-400 text-xs mt-1">
                {new Date(createdAt).toLocaleString()}
            </div>
        </div>
    );
}
