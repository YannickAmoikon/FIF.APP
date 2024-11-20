// services/election.services.ts
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE_URL} from '@/config/api';
import {CreateElectionDto, ElectionResponse, ElectionTypes} from "@/types/election.types";

// Créer un baseQuery personnalisé avec le token
const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const electionApi = createApi({
    reducerPath: 'electionApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Election'],
    endpoints: (builder) => ({
        // Récupérer toutes les élections
        getElections: builder.query<ElectionResponse, void>({
            query: () => 'election/get-all-election',
            providesTags: ['Election'],
        }),

        // Récupérer une élection par ID
        getElectionById: builder.query<ElectionTypes, number>({
            query: (id) => `election/get-election?id=${id}`,
            providesTags: (_result, _error, id) => [{type: 'Election', id}],
        }),

        // Créer une nouvelle élection
        createElection: builder.mutation<ElectionTypes, CreateElectionDto>({
            query: (newElection) => ({
                url: 'election/create-election',
                method: 'POST',
                body: newElection,
            }),
            invalidatesTags: ['Election'],
        }),

        // Mettre à jour une élection
        updateElection: builder.mutation<ElectionTypes, { id: number; updates: Partial<ElectionTypes> }>({
            query: ({id, updates}) => ({
                url: `elections/edit-election?id=${id}`,
                method: 'PUT',
                body: updates,
            }),
            invalidatesTags: (_result, _error, {id}) => [
                {type: 'Election', id},
                'Election',
            ],
        }),

        // Supprimer une élection
        deleteElection: builder.mutation<void, number>({
            query: (id) => ({
                url: `election/delete-election?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Election'],
        }),
    }),
});

// Export des hooks générés
export const {
    useGetElectionsQuery,
    useGetElectionByIdQuery,
    useCreateElectionMutation,
    useUpdateElectionMutation,
    useDeleteElectionMutation,
} = electionApi;