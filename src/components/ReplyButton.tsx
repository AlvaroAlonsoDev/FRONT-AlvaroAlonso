import { MessageCircle } from 'lucide-react'

type ReplyButtonProps = {
    action: () => void;
    isOpenReply?: boolean;
};

const ReplyButton = ({ action, isOpenReply }: ReplyButtonProps) => {
    return (
        <span
            className="
        flex items-center gap-1 px-2 py-0.5 rounded-full
        transition group select-none min-w-[38px] min-h-[28px] active:scale-95
    "
            tabIndex={-1}
        >
            <button
                onClick={action}
                className={`w-full flex items-center justify-end ${isOpenReply ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                tabIndex={0}
                aria-label="Me gusta"
                type="button"
                style={isOpenReply ? { color: '' } : {}}
            >
                <MessageCircle size={16} />
            </button>
        </span>
    )
}

export default ReplyButton;