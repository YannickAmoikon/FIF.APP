import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_BASE_URL} from "@/config";
import { CategoryResponse } from "@/types/category.types";


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

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        // Récuperer tous les catégories d'électeurs
        getCategories: builder.query<CategoryResponse, void>({
            query: () => 'categorie/get-all-categorie',
            providesTags: ['Category']
        })
    })
})

// Export des hooks générés
export const {
    useGetCategoriesQuery
} = categoryApi

