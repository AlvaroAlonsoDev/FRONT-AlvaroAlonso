import { PageContainer } from "../components/PageContainer";
import { FormAlert } from "../components/FormAlert";
import { ProfileHeader } from "../components/ProfileHeader";
import { ProfileStats } from "../components/ProfileStats";
import { RatingsBlock } from "../components/RatingsBlock";
import { PostsList } from "../components/PostsList";
import { RatingsHistoryList } from "../components/RatingsHistoryList";
import { useProfile } from "../contexts/useProfile";
import mockProfile from "../mockProfile.json";
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

    const profileMock = mockProfile.data;

    const { user, followersCount, followingCount, ratingsStats, posts, ratingsHistory } = profileMock;
    // const { user, followersCount, followingCount, ratingsStats, posts, ratingsHistory } = profile;

    return (
        <PageContainer>
            <div className="w-full max-w-lg shadow-xl p-6 flex flex-col gap-6 border border-gray-100 mb-16">
                <ProfileHeader
                    avatar={user.avatar}
                    displayName={user.displayName}
                    handle={user.handle}
                    description={user.description}
                    email={user.email}
                    location={user.location}
                    createdAt={user.createdAt}
                />
                <ProfileStats
                    followers={followersCount?.length || 0}
                    following={followingCount?.length || 0}
                />
                <RatingsBlock ratingsStats={ratingsStats ?? {}} />
                <PostsList posts={posts ?? []} />
                <RatingsHistoryList ratingsHistory={ratingsHistory ?? []} />
            </div>
        </PageContainer>
    );
}
