export type Rates = Record<string, number>;

export type CurrencyResponse =
  | {
      status: "ok";
      base: string;
      rates: Rates;
    }
  | {
      status: "error";
      message: string;
    };
