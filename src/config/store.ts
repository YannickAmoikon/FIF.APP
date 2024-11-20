// config/store.ts
import {configureStore} from '@reduxjs/toolkit';
import {electionApi} from '@/services/election.services';
import {authApi} from '@/services/auth.services';
import {typeApi} from '@/services/type.services';
import {candidateApi} from '@/services/candidate.services';
import { categoryApi } from '@/services/category.services';
import { voterApi } from '@/services/voter.services';

export const store = configureStore({
    reducer: {
        [electionApi.reducerPath]: electionApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [typeApi.reducerPath]: typeApi.reducer,
        [candidateApi.reducerPath]: candidateApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [voterApi.reducerPath]: voterApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(electionApi.middleware)
            .concat(authApi.middleware)
            .concat(typeApi.middleware)
            .concat(candidateApi.middleware)
            .concat(categoryApi.middleware)
            .concat(voterApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;