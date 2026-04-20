import { baseApi } from "../baseApi";

type SendLocationRequest = {
  lat: number;
  lng: number;
};

type SendLocationResponse = {
  status: string;
  received: {
    lat: number;
    lng: number;
  };
};

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
