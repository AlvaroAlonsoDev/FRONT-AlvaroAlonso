import { useRef, useLayoutEffect, useState } from "react";

type Props = {
    open: boolean;
    children: React.ReactNode;
};

export function SmoothCollapse({ open, children }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | "auto">(open ? "auto" : 0);

    useLayoutEffect(() => {
        if (open && ref.current) {
            setHeight(ref.current.scrollHeight);
            const timer = setTimeout(() => setHeight("auto"), 1000);
            return () => clearTimeout(timer);
        } else if (!open && ref.current) {
            setHeight(ref.current.scrollHeight);
            // Forzar reflow antes de colapsar (trick!)
            requestAnimationFrame(() => setHeight(0));
        }
    }, [open]);

    return (
        <div
            style={{
                maxHeight: height === "auto" ? "1000px" : height,
                transition: "max-height 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.25s",
                overflow: "hidden",
                opacity: open ? 1 : 0.65,
            }}
            ref={ref}
            aria-hidden={!open}
        >
            {children}
        </div>
    );
}
