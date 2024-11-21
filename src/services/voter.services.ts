import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/config/api';
import { VoterResponse, VoterTypes } from '@/types/voter.types';

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

interface GetVotersParams {
    electionId: string;
    page: number;
    limit?: number;
}

export const voterApi = createApi({
    reducerPath: 'voterApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Voter', 'ElectionDetails'],
    endpoints: (builder) => ({
        // Récupérer tous les électeurs d'une élection
        getVotersByElection: builder.query<{
            message: string;
            data: VoterResponse[];
            total_votant: number;
            page: number;
            totalPages: number;
        }, GetVotersParams>({
            query: ({ electionId, page, limit = 18 }) => 
                `votant/get-all-votant?id=${electionId}&page=${page}&limit=${limit}`,
            providesTags: ['Voter'],
        }),

        // Créer un électeur
        createVoter: builder.mutation<any, { body: any, electionId: string }>({
            query: ({body, electionId}) => ({
                url: `votant/create-votant?id=${electionId}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (_result, _error, {electionId}) => [
                {type: 'ElectionDetails', id: electionId},
                'Voter'
            ],
        }),

        // Mettre à jour un électeur
        updateVoter: builder.mutation<void, Partial<VoterTypes>>({
            query: (body) => ({
                url: `edit-voter?id=${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Voter'],
        }),

        // Supprimer un électeur
        deleteVoter: builder.mutation<void, string>({
            query: (id) => ({
                url: `votant/delete-votant?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ElectionDetails', 'Voter'],
        }),
    }),
});

export const {
    useGetVotersByElectionQuery,
    useCreateVoterMutation,
    useUpdateVoterMutation,
    useDeleteVoterMutation,
} = voterApi;