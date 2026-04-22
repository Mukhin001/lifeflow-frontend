import { baseApi } from "../baseApi";
import { SendLocationRequest, SendLocationResponse } from "./location.types";

export const locationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendLocation: builder.mutation<SendLocationResponse, SendLocationRequest>({
      query: (coords) => ({
        url: "/location",
        method: "POST",
        body: coords,
      }),
    }),
  }),
});

export const { useSendLocationMutation } = locationApi;
