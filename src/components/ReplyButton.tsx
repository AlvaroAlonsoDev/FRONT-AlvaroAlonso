type ReplyButtonProps = {
    action: (state: boolean) => void;
    isOpenReply?: boolean;
};

const ReplyButton = ({ action, isOpenReply }: ReplyButtonProps) => {
    const handleClick = () => {
        action(!isOpenReply);
    };
    return (
        <button
            onClick={handleClick}
            className={`flex items-center justify-end ${isOpenReply ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'} text-xs`}
            tabIndex={0}
            aria-label="Me gusta"
            type="button"
            style={isOpenReply ? { color: '' } : {}}
        >
            {!isOpenReply ? "Responder" : "Cerrar"}
        </button>
    )
}

export default ReplyButton;