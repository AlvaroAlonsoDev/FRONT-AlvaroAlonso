const Skeleton = ({ className = "" }) => (
    <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

export default function LoadingProfile() {
    return (
        <div className="flex justify-start min-h-dvh w-full">
            <div className="w-full flex flex-col">
                {/* SECTION: Profile Header */}
                <section className="flex flex-col items-center select-none w-full">
                    <div className="w-full mx-auto rounded-2xl bg-white/70 px-4 flex flex-col items-stretch py-0 relative">
                        <div className="flex items-center gap-3 w-full mb-1">
                            {/* Skeleton avatar */}
                            <Skeleton className="w-16 h-16 min-w-16 min-h-16 rounded-full border border-gray-300" />
                            <div className="flex-1 flex flex-col justify-center min-w-0">
                                {/* Name, verified, medalla */}
                                <div className="flex items-center gap-1">
                                    <Skeleton className="w-24 h-5" />
                                    <Skeleton className="w-5 h-5" />
                                    <Skeleton className="w-6 h-5" />
                                </div>
                                {/* Username */}
                                <Skeleton className="w-20 h-3 mt-1" />
                                {/* Followers & Following */}
                                <div className="flex items-center gap-5 mt-2">
                                    <div className="flex flex-col items-center gap-1">
                                        <Skeleton className="w-6 h-3" />
                                        <Skeleton className="w-10 h-2" />
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <Skeleton className="w-6 h-3" />
                                        <Skeleton className="w-10 h-2" />
                                    </div>
                                </div>
                            </div>
                            {/* More (logout) button */}
                            <Skeleton className="w-9 h-9 rounded-full" />
                        </div>
                    </div>
                    {/* Mostrar más button */}
                    <div className="w-full flex justify-center bg-white/90 rounded-b-2xl rounded-t-none overflow-hidden h-9 mt-3">
                        <Skeleton className="w-32 h-5 rounded-b-2xl" />
                    </div>
                </section>

                {/* SECTION: Reputación y valoraciones */}
                <div className="w-full flex flex-col gap-4 border-b pb-2 mt-6">
                    {/* Star reputation */}
                    <div
                        className="flex items-center justify-center bg-gradient-to-br from-[#161e27] via-[#253143] to-[#2c3342]"
                        style={{ minWidth: "100px", minHeight: "100px", boxShadow: "rgba(37, 49, 67, 0.333) 0px 8px 32px 0px, rgba(20, 26, 40, 0.667) 0px 2px 18px inset" }}
                    >
                        <div className="relative flex items-center justify-center" tabIndex={0} aria-label="Ver reputación">
                            <Skeleton className="absolute w-[84px] h-[84px] rounded-full" />
                            <Skeleton className="relative w-16 h-8 rounded-xl" />
                        </div>
                    </div>
                    {/* Ratings by aspect */}
                    <div className="flex flex-col mx-2 gap-2 mt-2">
                        {["Sinceridad", "Amabilidad", "Confianza", "Vibe", "Responsabilidad"].map((aspect) => (
                            <div key={aspect} className="flex items-center justify-between gap-3">
                                <Skeleton className="w-36 h-4" />
                                <div className="flex gap-2 min-w-[80px] justify-end">
                                    {[...Array(5)].map((_, i) => (
                                        <Skeleton key={i} className="w-6 h-6 rounded" />
                                    ))}
                                </div>
                            </div>
                        ))}
                        {/* Ver todas las valoraciones link */}
                        <div className="flex justify-end">
                            <Skeleton className="w-32 h-4" />
                        </div>
                    </div>
                </div>

                {/* SECTION: Valoraciones recibidas */}
                <div className="flex flex-col justify-center flex-1 p-2 mt-2">
                    <div className="flex items-center justify-between mb-2">
                        <Skeleton className="w-40 h-4" />
                    </div>
                    <div className="flex flex-col gap-2">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="p-1 rounded-md border bg-white/60 shadow-sm">
                                <div className="flex items-center gap-2 mb-1">
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                    <Skeleton className="w-20 h-4" />
                                    <Skeleton className="w-16 h-3" />
                                </div>
                                <div className="flex gap-2 text-xs mb-1 flex-wrap">
                                    {[...Array(5)].map((_, j) => (
                                        <Skeleton key={j} className="w-20 h-5 rounded-full" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 flex justify-center">
                        <Skeleton className="w-28 h-7 rounded-full" />
                    </div>
                </div>


            </div>
        </div>
    );
}
