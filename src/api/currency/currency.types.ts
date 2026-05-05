type Status = "ok" | "error";

export type Rates = Record<string, number>;

export interface CurrencyResponse {
  status: Status;
  base?: string;
  rates: Rates;
  message?: string;
}
