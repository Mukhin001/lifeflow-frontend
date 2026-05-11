import { Rates } from "@/src/api/currency/currency.types";

export type Field = "left" | "right";

interface CurrencyState {
  leftValue: string;
  rightValue: string;
  leftCurrency: string;
  rightCurrency: string;
  isLoading: boolean;
  isFetching: boolean;
  rates: Rates;
  rate: number;
}

interface CurrencyActions {
  handleAmountChange: (field: Field, value: string) => void;
  handleCurrencyChange: (field: Field, value: string) => void;
}

export type CurrencyViewProps = {
  state: CurrencyState;
  actions: CurrencyActions;
};

export type CurrencyConverterSuccess = {
  status: "success";
  state: CurrencyState;
  actions: CurrencyActions;
};

export type CurrencyConverterLoading = {
  status: "loading";
};

export type CurrencyConverterNetworkError = {
  status: "network-error";
  message: string;
  actions: { handleRetry: () => void };
};

export type CurrencyConverterError = {
  status: "error";
  message: string;
  actions: { handleRetry: () => void };
};

export type CurrencyConverterResult =
  | CurrencyConverterSuccess
  | CurrencyConverterLoading
  | CurrencyConverterNetworkError
  | CurrencyConverterError;
