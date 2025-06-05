// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import feedReducer from './slices/feedSlice';
import popularReducer from './slices/popularSlice';

export const store = configureStore({
    reducer: {
        feed: feedReducer,
        popular: popularReducer
    },
});

// Tipos de ayuda para TS:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
