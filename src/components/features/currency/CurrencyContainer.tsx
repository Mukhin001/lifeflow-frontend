"use client";

import CurrencyError from "./CurrencyError";
import CurrencyView from "./CurrencyView";
import { useCurrencyConverter } from "./hooks/useCurrencyConverter";

const CurrencyContainer = () => {
  const converter = useCurrencyConverter();

  if (converter.status === "loading") return <div>Загрузка курсов...</div>;
  if (converter.status === "network-error" || converter.status === "error")
    return (
      <CurrencyError
        status={converter.status}
        message={converter.message}
        onRetry={converter.actions.handleRetry}
      />
    );

  return <CurrencyView state={converter.state} actions={converter.actions} />;
};

export default CurrencyContainer;
