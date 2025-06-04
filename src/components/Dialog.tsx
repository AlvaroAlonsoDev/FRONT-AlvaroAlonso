// Dialog.tsx
import React, { useEffect, useRef } from "react";

type DialogProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
};

export const Dialog: React.FC<DialogProps> = ({
    open,
    onClose,
    children,
    className = "",
}) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    // Sincroniza apertura/cierre con showModal/close
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (open) {
            if (!dialog.open) dialog.showModal();
        } else {
            if (dialog.open) dialog.close();
        }
    }, [open]);

    // Cierre al cerrar el diálogo nativo
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const handleClose = () => onClose();
        dialog.addEventListener("close", handleClose);
        return () => dialog.removeEventListener("close", handleClose);
    }, [onClose]);

    return (
        <dialog ref={dialogRef} className={className} aria-modal="true">
            {children}
        </dialog>
    );
};

type DialogBackdropProps = {
    onClose: () => void;
    className?: string;
};

export const DialogBackdrop: React.FC<DialogBackdropProps> = ({
    onClose,
    className = "",
}) => (
    <div
        className={`fixed inset-0 bg-gray-500/75 transition-opacity ${className}`}
        aria-hidden="true"
        onClick={onClose}
    />
);

type DialogPanelProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const DialogPanel: React.FC<DialogPanelProps> = ({
    children,
    className = "",
    onClick,
}) => (
    <div
        className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ${className}`}
        onClick={onClick}
    >
        {children}
    </div>
);

type DialogTitleProps = {
    children: React.ReactNode;
    className?: string;
};

export const DialogTitle: React.FC<DialogTitleProps> = ({
    children,
    className = "",
}) => (
    <h3 className={`text-base font-semibold text-gray-900 ${className}`}>
        {children}
    </h3>
);
