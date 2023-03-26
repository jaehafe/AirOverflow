import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const starredApi = createApi({
  reducerPath: 'starred',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_STARRED_BASE_URL}`,
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
      query: (key) => ({
        url: `/starred/${key}.json`,
        method: 'DELETE',
      }),
    }),

    getStarOfCurrentLoggedInUser: builder.query({
      query: () => ({
        url: '/starred.json',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useAddStarMutation,
  useDeleteStarMutation,
  useGetStarOfCurrentLoggedInUserQuery,
} = starredApi;
console.log('starredApi', starredApi);
