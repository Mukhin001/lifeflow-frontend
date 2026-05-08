import { CurrencyViewProps } from "./model.ts/types";

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
          onChange={actions.handleLeftAmount}
          disabled={state.isLoading}
        />
        <CurrencySelect
          value={state.leftCurrency}
          onChange={actions.handleLeftCurrency}
          disabled={state.isLoading}
          exclude={state.rightCurrency}
        />

        <AmountInput
          value={state.rightValue}
          onChange={actions.handleRightAmount}
          disabled={state.isLoading}
        />

        <CurrencySelect
          value={state.rightCurrency}
          onChange={actions.handleRightCurrency}
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
