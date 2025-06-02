import { UserRound, Mail, CalendarDays, MapPin } from "lucide-react";

type Props = {
    avatar?: string;
    displayName: string;
    handle: string;
    description?: string;
    email?: string;
    location?: string;
    createdAt?: string;
};

export function ProfileHeader({
    avatar,
    displayName,
    handle,
    description,
    email,
    location,
    createdAt,
}: Props) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shadow-md">
                {avatar ? (
                    <img
                        src={avatar}
                        alt="avatar"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <UserRound size={64} className="text-gray-300" />
                )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">{displayName}</h1>
            <div className="text-gray-500 text-lg">@{handle}</div>
            {description && (
                <div className="text-gray-600 text-center mt-2">{description}</div>
            )}
            <div className="flex gap-3 text-gray-500 text-sm items-center mt-2 flex-wrap justify-center">
                {email && (
                    <span className="flex items-center gap-1">
                        <Mail size={16} /> {email}
                    </span>
                )}
                {location && (
                    <span className="flex items-center gap-1">
                        <MapPin size={16} /> {location}
                    </span>
                )}
                {createdAt && (
                    <span className="flex items-center gap-1">
                        <CalendarDays size={16} />{" "}
                        {new Date(createdAt).toLocaleDateString()}
                    </span>
                )}
            </div>
        </div>
    );
}
