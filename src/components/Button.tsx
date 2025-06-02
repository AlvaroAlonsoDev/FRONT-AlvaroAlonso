import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className = "", ...props }: ButtonProps) {
    return (
        <button
            className={`w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition active:scale-95 disabled:opacity-60 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
