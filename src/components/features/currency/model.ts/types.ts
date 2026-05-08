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
    handleLeftAmount: (v: string) => void;
    handleRightAmount: (v: string) => void;
    handleLeftCurrency: (v: string) => void;
    handleRightCurrency: (v: string) => void;
  };
};
