import { useState, useRef, useEffect } from "react";

interface ExpandableTextProps {
    text: string;
    maxLines?: number;
}

export function ExpandableText({ text, maxLines = 3 }: ExpandableTextProps) {
    const [expanded, setExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        // Detecta si el texto se desborda (ocupa más de maxLines)
        const el = textRef.current;
        if (el) {
            setShowButton(el.scrollHeight > el.clientHeight);
        }
    }, [text, maxLines]);

    return (
        <div className="relative">
            <p
                ref={textRef}
                className={`
                    text-sm text-gray-800 leading-relaxed whitespace-pre-line break-words transition-all duration-300 text-justify mr-2
                    ${!expanded ? `line-clamp-${maxLines}` : ""}
                `}
                style={{
                    display: "-webkit-box",
                    WebkitLineClamp: !expanded ? maxLines : "unset",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                }}
            >
                {text}
            </p>
            {showButton && (
                <button
                    className="w-full text-xs grid justify-center font-semibold text-blue-600 hover:underline mt-1"
                    onClick={() => setExpanded((e) => !e)}
                >
                    {expanded ? "Ver menos" : "Ver más"}
                </button>
            )}
        </div>
    );
}
