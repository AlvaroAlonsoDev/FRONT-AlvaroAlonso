// src/slices/feedSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Post {
    _id: string;
    author: {
        _id: string;
        avatar?: string;
        displayName: string;
        handle: string;
    };
    createdAt: string | Date;
    likesCount: number;
    content: string;
    repliesCount: number;
    repostsCount: number;
    replyTo: {
        _id: string;
        author: {
            _id: string;
            avatar?: string;
            displayName: string;
            handle: string;
        },
        content: string;
        createdAt?: string | Date;
    };
    media: string[];
    likedByMe: boolean;
    authorFollowedByMe?: boolean;
}

interface FeedState {
    posts: Post[];
    loading: boolean;
    error: string | null;
}

const initialState: FeedState = {
    posts: [],
    loading: false,
    error: null,
};

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        setFeed(state, action: PayloadAction<Post[]>) {
            state.posts = action.payload;
        },
        addPost(state, action: PayloadAction<Post>) {
            state.posts.unshift(action.payload);
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter(post => post._id !== action.payload);
        },
        clearFeed(state) {
            state.posts = [];
        },
        updateFollowingStatusFeed(state, action: PayloadAction<{ targetId: string }>) {
            const { targetId } = action.payload;
            state.posts.forEach(post => {
                if (post.author._id === targetId) {
                    post.authorFollowedByMe = !post.authorFollowedByMe;
                }
            });
        }
    },
});

export const { setLoading, setError, setFeed, addPost, removePost, clearFeed, updateFollowingStatusFeed } = feedSlice.actions;
export default feedSlice.reducer;
