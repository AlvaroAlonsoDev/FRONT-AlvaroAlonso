// src/slices/feedSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Post } from './feedSlice';

interface PopularState {
    posts: Post[];
    loading: boolean;
    error: string | null;
}

const initialState: PopularState = {
    posts: [],
    loading: false,
    error: null,
};

const popularSlice = createSlice({
    name: 'popular',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        setPopular(state, action: PayloadAction<Post[]>) {
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
        updateFollowingStatusPopular(state, action: PayloadAction<{ targetId: string }>) {
            const { targetId } = action.payload;
            state.posts.forEach(post => {
                if (post.author._id === targetId) {
                    post.authorFollowedByMe = !post.authorFollowedByMe;
                }
            });
        }
    },
});

export const { setLoading, setError, setPopular, addPost, removePost, clearFeed, updateFollowingStatusPopular } = popularSlice.actions;
export default popularSlice.reducer;
