import React from "react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
};

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
    ({ label, error, className = "", ...props }, ref) => (
        <div className="flex flex-col gap-1">
            {label && (
                <label
                    htmlFor={props.name}
                    className="text-gray-700 font-medium text-base mb-1"
                >
                    {label}
                </label>
            )}
            <input
                ref={ref}
                className={`rounded-xl bg-gray-100 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition text-lg ${error ? "border border-red-400" : ""
                    } ${className}`}
                {...props}
            />
            {error && (
                <span className="text-red-600 text-xs pl-1 pt-1">{error}</span>
            )}
        </div>
    )
);
InputField.displayName = "InputField";
