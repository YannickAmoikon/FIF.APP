import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/config/api";
import { PollResponse, PollType } from "@/types/poll.types";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const pollApi = createApi({
  reducerPath: "pollApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Poll", "PollDetails"],
  endpoints: (builder) => ({
    getPolls: builder.query<PollResponse, number>({
      query: (page = 1) => `sondage/get-all-sondage?page=${page}`,
      providesTags: ["Poll"],
    }),

    getPollById: builder.query<PollType, number>({
      query: (id) => `sondage/get-sondage?id=${id}`,
      providesTags: (result, error, id) => [{ type: "PollDetails", id }],
    }),

    createPoll: builder.mutation<PollType, Partial<PollType>>({
      query: (newPoll) => ({
        url: "sondage/create-sondage",
        method: "POST",
        body: newPoll,
      }),
      invalidatesTags: ["Poll"],
    }),

    updatePoll: builder.mutation<PollType, Partial<PollType>>({
      query: ({ id, ...updatedPoll }) => ({
        url: `sondage/update-sondage?id=${id}`,
        method: "PUT",
        body: updatedPoll,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Poll",
        { type: "PollDetails", id },
      ],
    }),

    deletePoll: builder.mutation<void, number>({
      query: (id) => ({
        url: `sondage/delete-sondage?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Poll"],
    }),
  }),
});

export const {
  useGetPollsQuery,
  useGetPollByIdQuery,
  useCreatePollMutation,
  useUpdatePollMutation,
  useDeletePollMutation,
} = pollApi;
