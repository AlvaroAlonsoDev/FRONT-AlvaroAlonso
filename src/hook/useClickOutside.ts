import { useEffect, type RefObject } from "react";

export function useClickOutside<T extends HTMLElement>(
    ref: RefObject<T>,
    handler: () => void,
    when: boolean = true
) {
    useEffect(() => {
        if (!when) return;

        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) return;
            setTimeout(() => {
                handler();
            }, 0)
        };

        document.addEventListener("mousedown", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
        };
    }, [ref, handler, when]);
}