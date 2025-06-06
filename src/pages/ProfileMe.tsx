import { PageContainer } from "../components/PageContainer";
import { FormAlert } from "../components/FormAlert";
import { ProfileHeader } from "../components/ProfileHeader";
import { RatingsBlock } from "../components/RatingsBlock";
import { PostsList } from "../components/PostsList";
import { RatingsFromMe } from "../components/RatingsFromMe";
import { useProfile } from "../hook/useProfile";
import LoadingProfile from "../components/LoadingProfile";

export default function ProfileMe() {
    const { profile, loading, error } = useProfile();

    if (loading) {
        return (
            <PageContainer>
                <LoadingProfile />
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
            <div className="w-full flex flex-col gap-2">
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
                <RatingsBlock ratingsStats={ratingsStats ?? {}} />
                <RatingsFromMe ratingsHistory={ratingsHistory ?? []} text="Valoraciones recibidas" />
                <PostsList posts={posts ?? []} text="Mis últimas publicaciones" user={user} />
            </div>
        </PageContainer>
    );
}
