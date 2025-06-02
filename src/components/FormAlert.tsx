type FormAlertProps = {
    message: string;
    type?: "success" | "error";
};

export function FormAlert({ message, type = "error" }: FormAlertProps) {
    const styles =
        type === "error"
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700 animate-pulse";
    return (
        <div
            className={`rounded-xl py-2 px-3 text-center text-sm ${styles}`}
            role="alert"
        >
            {message}
        </div>
    );
}
