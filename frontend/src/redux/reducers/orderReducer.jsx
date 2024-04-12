import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    myOrders: builder.query({
      query: () => `myorders`,
    }),
    orderDetails: builder.query({
      query: (id) => `order/${id}`,
    }),
    createOrder: builder.mutation({
      query: ({ cart, details, city }) => {
        return {
          url: 'createorder',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: { cart, details, city },
        };
      },
    }),
    getAllOrdersAdmin: builder.query({
      query: () => `admin/orders`,
    }),
    updateOrderStatus: builder.query({
      query: (id) => `admin/order/${id}`,
    }),
  }),
});

export const {
  useMyOrdersQuery,
  useOrderDetailsQuery,
  useCreateOrderMutation,
  useGetAllOrdersAdminQuery,
  useLazyUpdateOrderStatusQuery,
} = orderApi;
