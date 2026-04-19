import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GreetingResponse {
  status: string;
  message: string;
  time: string;
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  endpoints: (builder) => ({
    getGreetingServer: builder.query<GreetingResponse, void>({
      query: () => "/",
    }),
  }),
});

export const { useGetGreetingServerQuery } = baseApi;
