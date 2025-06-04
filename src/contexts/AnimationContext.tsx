import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

type AnimationContextType = {
    isAnimating: boolean;
    text?: string;
    triggerAnimation: (text?: string) => void;
};

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [text, setText] = useState<string | undefined>(undefined);

    const triggerAnimation = useCallback((newText?: string) => {
        setText(newText);
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
            setText(undefined);
        }, 1000); // Duración de la animación (en ms)
    }, []);

    return (
        <AnimationContext.Provider value={{ isAnimating, text, triggerAnimation }}>
            {children}
        </AnimationContext.Provider>
    );
};

export const useAnimation = () => {
    const context = useContext(AnimationContext);
    if (!context) throw new Error("useAnimation debe usarse dentro de AnimationProvider");
    return context;
};
