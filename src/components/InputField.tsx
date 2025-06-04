import React, { useState, useRef } from "react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    className?: string;
};

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
    (
        { label, error, iconLeft, iconRight, className = "", id, ...props },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState(false);
        const inputRef = useRef<HTMLInputElement>(null);

        // Permitir pasar ref desde fuera o usar el interno
        const actualRef = (ref as React.RefObject<HTMLInputElement>) || inputRef;

        // Determinar si el label debe estar flotando
        const hasValue = typeof props.value === "string"
            ? props.value.length > 0
            : !!inputRef.current?.value?.length;

        const showFloating = isFocused || hasValue;

        const inputId = id || props.name || Math.random().toString(36).slice(2);

        return (
            <div className="w-full relative">
                {/* Icono izquierda */}
                {iconLeft && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        {iconLeft}
                    </span>
                )}

                <input
                    id={inputId}
                    ref={actualRef}
                    className={`
                        w-full rounded-xl bg-gray-100/90 px-4 py-3 pr-${iconRight ? "12" : "4"} pl-${iconLeft ? "12" : "4"}
                        text-lg appearance-none outline-none transition-all duration-200
                        shadow-sm border
                        ${isFocused ? "border-blue-500 ring-2 ring-blue-100 shadow-md" : "border-gray-200"}
                        ${error ? "border-red-400" : ""}
                        ${className}
                    `}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${inputId}-error` : undefined}
                    value={props.value}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />

                {/* Floating label */}
                {label && (
                    <label
                        htmlFor={inputId}
                        className={`
                            ${isFocused ? "bg-gray-50/90" : ""}
                        pointer-events-none absolute left-4 transition-all duration-200 origin-left 
                        ${showFloating
                                ? "text-xs font-medium text-blue-600 z-10 scale-90 backdrop-blur-sm"
                                : "text-base text-gray-400 top-1/2 -translate-y-1/2"
                            }
                        ${error ? "text-red-500" : ""}
                    `}
                        style={{
                            top: showFloating ? '-8px' : undefined,
                        }}
                    >
                        {label}
                    </label>
                )}
                {/* Icono derecha */}
                {iconRight && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                        {iconRight}
                    </span>
                )}

                {/* Error */}
                {error && (
                    <span
                        id={`${inputId}-error`}
                        className="block mt-1 text-xs text-red-600 animate-[fadeIn_0.25s]"
                        aria-live="polite"
                    >
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

InputField.displayName = "InputField";
