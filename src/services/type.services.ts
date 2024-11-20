import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_BASE_URL} from "@/config";
import {TypeResponse} from "@/types/type.types";

// Créer un baseQuery avec authentification
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

export const typeApi = createApi({
    reducerPath: 'typeApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Type'],
    endpoints: (builder) => ({
        // Récuperer tous les types d'élections
        getTypes: builder.query<TypeResponse, void>({
            query: () => 'type/get-all-type',
            providesTags: ['Type']
        })
    })
})

// Export des hooks générés
export const {
    useGetTypesQuery
} = typeApi

