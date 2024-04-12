import { createReducer } from "@reduxjs/toolkit";

const loadUserRequest = "Requset";
const loadUserSuccess = "Success";
const loadUserFail = "Fail";

// const count = createReducer(
//   {},
//   {
//     loadUserRequest: (state, action) => {
//       state.loading = true;
//     },
//     loadUserSuccess: (state) => {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.user = action.payload;
//     },
//     loadUserFail: (state) => {
//       state.loading = false;
//       state.isAuthenticated = false;
//       state.error = action.payload;
//     },
//   }
// );

// const initialState = {
//   loading: false,
//   isAuthenticated: false,
//   user: [],
//   error: null,
// };

// const authReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(loadUserRequest, (state, action) => {
//       state.loading = true;
//     })
//     .addCase(loadUserSuccess, (state, action) => {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.user = action.payload;
//     })
//     .addCase(loadUserFail, (state, action) => {
//       state.loading = false;
//       state.isAuthenticated = false;
//       state.error = action.payload;
//     });
// });

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getuser: builder.query({
      query: () => `me`,
    }),
    userLoggedout: builder.query({
      query: () => `logout`,
    }),
    adminStats: builder.query({
      query: () => `admin/stats`,
    }),
    adminUsers: builder.query({
      query: () => `admin/users`,
    }),
  }),
});

export const {
  useGetuserQuery,
  useLazyUserLoggedoutQuery,
  useAdminStatsQuery,
  useAdminUsersQuery,
} = userApi;
