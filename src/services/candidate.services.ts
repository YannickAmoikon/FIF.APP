import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/config/api';
import { CandidateResponse, CandidateTypes } from '@/types/candidate.types';

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

interface GetCandidatesParams {
    electionId: string;
    page: number;
    limit?: number;
}

export const candidateApi = createApi({
    reducerPath: 'candidateApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Candidate', 'ElectionDetails'],
    endpoints: (builder) => ({
        // Get all candidates for an election with pagination
        getCandidatesByElection: builder.query<{
            message: string;
            data: CandidateResponse[];
            total_candidat: number;
            page: number;
            totalPages: number;
        }, GetCandidatesParams>({
            query: ({ electionId, page, limit = 18 }) => 
                `/candidat/get-all-candidat?id=${electionId}&page=${page}&limit=${limit}`,
            providesTags: ['Candidate'],
        }),
        
        // Create a candidate
        createCandidate: builder.mutation<any, { body: any, electionId: string }>({
            query: ({body, electionId}) => ({
                url: `candidat/create-candidat?id=${electionId}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (_result, _error, {electionId}) => [
                {type: 'ElectionDetails', id: electionId},
                'Candidate'
            ],
        }),
        
        // Update a candidate
        updateCandidate: builder.mutation<void, Partial<CandidateTypes>>({
            query: (body) => ({
                url: `candidat/edit-candidat?id=${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Candidate'],
        }),
        
        // Delete a candidate
        deleteCandidate: builder.mutation<void, string>({
            query: (id) => ({
                url: `candidat/delete-candidat?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ElectionDetails', 'Candidate'],
        }),
    }),
});

export const {
    useGetCandidatesByElectionQuery,
    useCreateCandidateMutation,
    useUpdateCandidateMutation,
    useDeleteCandidateMutation,
} = candidateApi;