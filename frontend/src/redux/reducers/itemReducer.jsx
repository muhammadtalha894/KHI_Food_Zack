import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const itemApi = createApi({
  reducerPath: 'itemApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1/',
    credentials: 'include',
  }),

  endpoints: (builder) => ({
    getAllItem: builder.query({
      query: () => `getitems`,
    }),
    itemDetails: builder.query({
      query: (id) => `getitemdetails/${id}`,
    }),
    updateRating: builder.query({
      query: ({ id, rating }) => `update/rating/${id}/${rating}`,
    }),
    additemApi: builder.mutation({
      query: ({ image, additem }) => {
        return {
          url: 'additem',
          method: 'POST',
          body: { image, additem },
        };
      },
    }),
  }),
});

export const {
  useItemDetailsQuery,
  useGetAllItemQuery,
  useAdditemApiMutation,
  useLazyUpdateRatingQuery,
} = itemApi;
