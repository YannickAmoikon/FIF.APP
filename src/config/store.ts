// config/store.ts
import {configureStore} from '@reduxjs/toolkit';
import {electionApi} from '@/services/election.services';
import {authApi} from '@/services/auth.services';
import {typeApi} from '@/services/type.services';

export const store = configureStore({
    reducer: {
        [electionApi.reducerPath]: electionApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [typeApi.reducerPath]: typeApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(electionApi.middleware)
            .concat(authApi.middleware)
            .concat(typeApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;