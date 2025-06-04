const TAB_OPTIONS = [
    { key: "feed", label: "Feed" },
    { key: "popular", label: "Popular" },
];

export function FeedHeader({
    value,
    onChange,
}: {
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <header className="bg-white/90 backdrop-blur sticky top-0 z-10 border-b border-gray-200">
            <div className="max-w-2xl mx-auto flex px-4">
                {TAB_OPTIONS.map((tab) => (
                    <button
                        key={tab.key}
                        className={`flex-1 py-4 text-base font-semibold text-center relative outline-none
              ${value === tab.key ? "text-blue-600" : "text-gray-400"}
              transition-colors
              focus-visible:ring-2 focus-visible:ring-blue-500
            `}
                        style={{ WebkitTapHighlightColor: "transparent" }}
                        onClick={() => onChange(tab.key)}
                    >
                        {tab.label}
                        {/* Línea animada debajo */}
                        <span
                            className={`
                absolute left-1/2 -translate-x-1/2 bottom-0 h-[2.5px] w-7 rounded-full bg-blue-600
                transition-all duration-200
                ${value === tab.key ? "opacity-100 scale-x-100" : "opacity-0 scale-x-75"}
              `}
                        />
                    </button>
                ))}
            </div>
        </header>
    );
}
