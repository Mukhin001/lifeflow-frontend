import { baseApi } from "../baseApi";

interface GreetingResponse {
  status: string;
  message: string;
  time: string;
}

const greetingServer = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGreetingServer: builder.query<GreetingResponse, void>({
      query: () => "/",
    }),
  }),
});

export const { useGetGreetingServerQuery } = greetingServer;
