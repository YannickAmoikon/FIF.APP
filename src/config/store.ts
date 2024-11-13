import { configureStore } from '@reduxjs/toolkit';
import { electionApi } from '@/services/electionApi';

export const store = configureStore({
    reducer: {
        [electionApi.reducerPath]: electionApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(electionApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;