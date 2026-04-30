import { baseApi } from "../baseApi";
import { CalculateRouteRequest, CalculateRouteResponse } from "./route.types";

export const routeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    calculateRoute: builder.mutation<
      CalculateRouteResponse,
      CalculateRouteRequest
    >({
      query: ({ start, end }) => ({
        url: "/route/calculate",
        method: "POST",
        body: { start, end },
      }),
    }),
  }),
});

export const { useCalculateRouteMutation } = routeApi;
