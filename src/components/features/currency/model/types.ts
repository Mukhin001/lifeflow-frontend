export type Field = "left" | "right";

export type CurrencyViewProps = {
  state: {
    leftValue: string;
    rightValue: string;
    leftCurrency: string;
    rightCurrency: string;
    isLoading: boolean;
    isFetching: boolean;
    rates: Record<string, number>;
    rate: number;
  };
  actions: {
    handleAmountChange: (field: Field, v: string) => void;
    handleCurrencyChange: (field: Field, v: string) => void;
  };
};
