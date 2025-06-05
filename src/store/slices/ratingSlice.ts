// src/slices/feedSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Rating {
    _id: string;
    toUser?: {
        _id: string;
        displayName: string;
        handle: string;
        avatar: string;
    };
    fromUser?: {
        _id: string;
        displayName: string;
        handle: string;
        avatar: string;
    };
    ratings: Record<string, number>;
    comment: string;
    weight: number;
    visibility: boolean;
    createdAt: string;
    updatedAt: string;
}

interface FeedState {
    ratingsToMe: Rating[];
    ratingsGiven: Rating[];
    ratingsStats: Record<string, any>;
    loading: boolean;
    error: string | null;
}

const initialState: FeedState = {
    ratingsToMe: [],
    ratingsGiven: [],
    ratingsStats: {},
    loading: false,
    error: null,
};

const feedSlice = createSlice({
    name: 'rating',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },

        // Recibidas por mí
        setRatingsToMe(state, action: PayloadAction<Rating[]>) {
            state.ratingsToMe = action.payload;
        },
        addRatingToMe(state, action: PayloadAction<Rating>) {
            state.ratingsToMe.unshift(action.payload); // añade al principio
        },

        // Emitidas por mí
        setRatingsGiven(state, action: PayloadAction<Rating[]>) {
            state.ratingsGiven = action.payload;
        },
        addRatingGiven(state, action: PayloadAction<Rating>) {
            state.ratingsGiven.unshift(action.payload);
        },

        // Stats globales
        setRatingsStats(state, action: PayloadAction<Record<string, any>>) {
            state.ratingsStats = action.payload;
        },

        // Reseteo (ejemplo: logout)
        resetRatings(state) {
            state.ratingsToMe = [];
            state.ratingsGiven = [];
            state.ratingsStats = {};
            state.loading = false;
            state.error = null;
        }
    },
});

export const {
    setLoading,
    setError,
    setRatingsToMe,
    addRatingToMe,
    setRatingsGiven,
    addRatingGiven,
    setRatingsStats,
    resetRatings,
} = feedSlice.actions;

export default feedSlice.reducer;
