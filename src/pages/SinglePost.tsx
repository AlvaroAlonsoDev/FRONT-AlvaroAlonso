import TopBarBack from "../components/TopBarBack";

// Util para formatear fecha
// const formatDate = (iso: string) =>
//     new Date(iso).toLocaleString("es-ES", {
//         hour: "2-digit",
//         minute: "2-digit",
//         day: "numeric",
//         month: "short",
//         year: "2-digit",
//     });

// const MediaGallery = ({ media }: { media: string[] }) => {
//     if (!media?.length) return null;
//     if (media.length === 1)
//         return (
//             <div className="rounded-xl overflow-hidden mt-4 mb-2 w-full">
//                 <img
//                     src={media[0]}
//                     alt=""
//                     className="w-full h-60 object-cover"
//                     draggable={false}
//                 />
//             </div>
//         );
//     // Carrusel móvil / grid desktop
//     return (
//         <div className="my-2">
//             {/* TODO: Carousel de imagenes */}
//             <div className="grid gap-1 hide-scrollbar md:hidden">
//                 {media.map((url, i) => (
//                     <img
//                         key={i}
//                         src={url}
//                         alt=""
//                         className="h-40 w-64 object-cover rounded-lg flex-shrink-0 border border-zinc-100"
//                         draggable={false}
//                     />
//                 ))}
//             </div>
//             <div className="hidden md:grid grid-cols-2 gap-2">
//                 {media.map((url, i) => (
//                     <img
//                         key={i}
//                         src={url}
//                         alt=""
//                         className="w-full h-48 object-cover rounded-lg border border-zinc-100"
//                         draggable={false}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// Oculta la scrollbar horizontal (opcional, para más limpieza visual en móvil)
const globalStyles = `
.hide-scrollbar::-webkit-scrollbar {display: none;}
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none;}
`;

const SinglePost = () => {
    // const post = {
    //     _id: "post2",
    //     author: {
    //         _id: "user2",
    //         username: "lucia_gg",
    //         avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    //     },
    //     content:
    //         "Hoy me he animado a salir a correr por primera vez en meses. ¡Feliz martes a todos! 🏃‍♀️✨.",
    //     createdAt: "2025-06-03T11:10:00Z",
    //     repliesCount: 1,
    //     likesCount: 8,
    //     likedByMe: false,
    //     repostsCount: 0,
    //     media: [
    //         "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80",
    //         "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80",
    //         "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80",
    //     ],
    //     replyTo: null,
    //     threadRoot: null,
    // };

    return (

        <>
            {/* Global styles para ocultar scrollbar horizontal */}
            <style>{globalStyles}</style>
            <div className="min-h-screen bg-white">
                <TopBarBack text="Post" backUrl="/feed" />
                {/* Content */}
                {/* <main className="mx-auto px-4 py-5 w-full">
                    <div className="flex gap-3 items-start">
                        <img
                            src={post.author.avatar}
                            alt={post.author.username}
                            className="w-12 h-12 rounded-full object-cover border border-zinc-200"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-zinc-900 text-sm truncate">
                                    {post.author.username}
                                </span>
                                <span className="text-zinc-400 text-xs truncate">
                                    @{post.author.username}
                                </span>
                                <span className="text-zinc-300 mx-1">·</span>
                                <span className="text-zinc-400 text-xs">{formatDate(post.createdAt)}</span>
                            </div>
                            <div className="mt-2 text-lg leading-relaxed text-zinc-900 break-words font-normal">
                                {post.content}
                            </div>
                            <MediaGallery media={post.media} />
                            <div className="flex gap-6 items-center mt-4 select-none">
                                <button
                                    className={`flex items-center gap-1 rounded-full px-3 py-1.5 hover:bg-blue-50 transition font-medium ${post.likedByMe
                                        ? "text-blue-600 bg-blue-100"
                                        : "text-zinc-500"
                                        }`}
                                >
                                    <Heart
                                        size={22}
                                        fill={post.likedByMe ? "#2563eb" : "none"}
                                        strokeWidth={2}
                                    />
                                    <span>{post.likesCount}</span>
                                </button>
                                <button className="flex items-center gap-1 rounded-full px-3 py-1.5 hover:bg-blue-50 transition text-zinc-500 font-medium">
                                    <MessageCircle size={22} />
                                </button>
                            </div>
                        </div>
                    </div>
                </main> */}
                <p className="p-4">Aun esta contruyendose este apartado</p>
            </div>
        </>
    );
};

export default SinglePost;
