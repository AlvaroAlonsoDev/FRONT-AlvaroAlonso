import { useRef, useEffect } from "react";

type ReplyBoxProps = {
    value: string;
    setValue: (val: string) => void;
    onSend: () => void;
    autoFocus?: boolean;
};

export function ReplyBox({ onSend, value, setValue, autoFocus = false }: ReplyBoxProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Autoexpansión básica 
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [value]);

    // Ctrl+Enter/Cmd+Enter para enviar
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && value.trim()) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="w-full">
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 flex flex-col">
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe una respuesta…"
                    rows={1}
                    className="
            w-full bg-transparent resize-none text-[15px] leading-snug
            outline-none border-none min-h-[36px] max-h-80
            placeholder-gray-400 transition
          "
                    autoFocus={autoFocus}
                    maxLength={240}
                />
                <div className="flex justify-end mt-1">
                    <button
                        type="button"
                        disabled={!value.trim()}
                        onClick={onSend}
                        className={`
              px-4 py-1.5 rounded-full font-semibold text-sm transition shadow-sm
              ${value.trim()
                                ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
            `}
                    >
                        Responder
                    </button>
                </div>
            </div>
            <div className="text-xs text-gray-400 mt-1 pl-1 hidden sm:block">
                Pulsa <kbd>Ctrl</kbd>+<kbd>Enter</kbd> para enviar
            </div>
        </div>
    );
}
