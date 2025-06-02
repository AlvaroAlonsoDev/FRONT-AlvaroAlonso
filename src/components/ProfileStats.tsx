type Props = {
    followers: number;
    following: number;
};

export function ProfileStats({ followers, following }: Props) {
    return (
        <div className="flex justify-center gap-6 text-center mt-2">
            <div>
                <div className="font-bold text-lg">{followers}</div>
                <div className="text-gray-500 text-xs">Seguidores</div>
            </div>
            <div>
                <div className="font-bold text-lg">{following}</div>
                <div className="text-gray-500 text-xs">Siguiendo</div>
            </div>
        </div>
    );
}
