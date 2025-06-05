import { PageContainer } from "../components/PageContainer";
import { FormAlert } from "../components/FormAlert";
import { ProfileHeader } from "../components/ProfileHeader";
import { RatingsBlock } from "../components/RatingsBlock";
import { PostsList } from "../components/PostsList";
import { RatingsHistoryList } from "../components/RatingsHistoryList";
import { useProfile } from "../hook/useProfile";
import Loading from "../components/Loading";

export default function Profile() {
    const { profile, loading, error } = useProfile();

    if (loading) {
        return (
            <PageContainer>
                {/* TODO: LoadingProfile */}
                <Loading />
            </PageContainer>
        );
    }

    if (error) {
        return (
            <PageContainer>
                <FormAlert message={error} />
            </PageContainer>
        );
    }

    if (!profile?.user) {
        return (
            <PageContainer>
                <FormAlert message="No se encontró el perfil" />
            </PageContainer>
        );
    }

    const { user, followersCount, followingCount, ratingsStats, posts, ratingsHistory } = profile;

    return (
        <PageContainer>
            <div className="w-full px-4 pb-4 flex flex-col gap-2 mt-2">
                <ProfileHeader
                    avatar={user.avatar}
                    displayName={user.displayName}
                    handle={user.handle}
                    description={user.description}
                    email={user.email}
                    location={user.location}
                    createdAt={user.createdAt}
                    followers={followersCount?.length || 0}
                    following={followingCount?.length || 0}
                />
                <RatingsBlock ratingsStats={ratingsStats ?? {}} text="Valoraciones" />
                <PostsList posts={posts ?? []} text="Mis últimas publicaciones" />
                <RatingsHistoryList ratingsHistory={ratingsHistory ?? []} text="Valoraciones recibidas" />
            </div>
        </PageContainer>
    );
}
