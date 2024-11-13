import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Election, ElectionResponse, CreateElectionDto, UpdateElectionDto } from '@/types/election';

export const electionApi = createApi({
    reducerPath: 'electionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        credentials: 'include',
    }),
    tagTypes: ['Election'],
    endpoints: (builder) => ({
        getElections: builder.query<ElectionResponse, { page?: number; page_size?: number }>({
            query: ({ page = 1, page_size = 10 }) => ({
                url: `/elections`,
                params: { page, page_size }
            }),
            providesTags: ['Election']
        }),

        getElectionById: builder.query<Election, string>({
            query: (id) => `/elections/${id}`,
            providesTags: ['Election']
        }),

        createElection: builder.mutation<Election, CreateElectionDto>({
            query: (election) => ({
                url: '/elections',
                method: 'POST',
                body: election,
            }),
            invalidatesTags: ['Election']
        }),

        updateElection: builder.mutation<Election, { id: string; body: UpdateElectionDto }>({
            query: ({ id, body }) => ({
                url: `/elections/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Election']
        }),

        deleteElection: builder.mutation<void, string>({
            query: (id) => ({
                url: `/elections/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Election']
        }),

        // Optionnel : Endpoint pour changer le statut d'une élection
        updateElectionStatus: builder.mutation<Election, { id: string; status: string }>({
            query: ({ id, status }) => ({
                url: `/elections/${id}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Election']
        }),
    }),
});

export const {
    useGetElectionsQuery,
    useGetElectionByIdQuery,
    useCreateElectionMutation,
    useUpdateElectionMutation,
    useDeleteElectionMutation,
    useUpdateElectionStatusMutation,
} = electionApi;