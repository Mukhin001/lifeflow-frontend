import { baseApi } from "../baseApi";
import { CurrencyResponse } from "./currency.types";

export const currencyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRates: builder.query<CurrencyResponse, string>({
      query: (base) => ({
        url: `/currency/rates?base=${base}`,
      }),
    }),
  }),
});

export const { useGetRatesQuery } = currencyApi;
