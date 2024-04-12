import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    sendEmail: builder.mutation({
      query: ({ name, email, message }) => {
        return {
          url: "sendemail",
          method: "POST",
          body: { name, email, message },
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
  }),
});

export const { useSendEmailMutation } = contactApi;
