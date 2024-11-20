// services/auth.service.ts
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE_URL} from '@/config/api';

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: number;
        email: string;
        // autres champs utilisateur
    };
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'user/login',
                method: 'POST',
                body: credentials,
            }),
            // Gestion du succès de la connexion
            onQueryStarted: async (_, {queryFulfilled}) => {
                try {
                    const {data} = await queryFulfilled;
                    localStorage.setItem('token', data.token);
                } catch (error) {
                    // Gestion des erreurs
                }
            },
        }),
    }),
});

export const {useLoginMutation} = authApi;