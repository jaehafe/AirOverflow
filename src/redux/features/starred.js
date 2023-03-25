import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const starredApi = createApi({
  reducerPath: 'starred',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_STARRED_BASE_URL123}`,
  }),

  endpoints: (builder) => ({
    addStar: builder.mutation({
      query: (params) => ({
        url: '/starred.json',
        method: 'POST',
        body: params,
      }),
    }),

    deleteStar: builder.mutation({
      query: (id) => ({
        url: `/starred/${id}.json`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useAddStarMutation, useDeleteStarMutation } = starredApi;
console.log('starredApi', starredApi);
