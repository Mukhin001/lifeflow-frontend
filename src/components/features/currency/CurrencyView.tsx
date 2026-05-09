import { CurrencyViewProps } from "./model/types";

import AmountInput from "./AmountInput";
import CurrencySelect from "./CurrencySelect";
import ResultDisplay from "./ResultDisplay";

const CurrencyView = ({ state, actions }: CurrencyViewProps) => {
  return (
    <>
      {state.isFetching && <div>Обновляем курсы...</div>}

      <div
        style={{
          opacity: state.isFetching ? 0.5 : 1,
          pointerEvents: state.isFetching ? "none" : "auto",
        }}
      >
        <AmountInput
          value={state.leftValue}
          onChange={(value) => actions.handleAmountChange("left", value)}
          disabled={state.isLoading}
        />
        <CurrencySelect
          value={state.leftCurrency}
          onChange={(value) => actions.handleCurrencyChange("left", value)}
          disabled={state.isLoading}
          exclude={state.rightCurrency}
        />

        <AmountInput
          value={state.rightValue}
          onChange={(value) => actions.handleAmountChange("right", value)}
          disabled={state.isLoading}
        />

        <CurrencySelect
          value={state.rightCurrency}
          onChange={(value) => actions.handleCurrencyChange("right", value)}
          disabled={state.isLoading}
          exclude={state.leftCurrency}
        />

        <ResultDisplay
          rate={state.rate}
          rates={state.rates}
          leftCurrency={state.leftCurrency}
          rightCurrency={state.rightCurrency}
        />
      </div>
    </>
  );
};

export default CurrencyView;
