"use client";

import CurrencyView from "./CurrencyView";
import { useCurrencyConverter } from "./hooks/useCurrencyConverter";

const CurrencyContainer = () => {
  const converter = useCurrencyConverter();

  if (converter.isLoading) return <div>Загрузка курсов...</div>;
  if (converter.error) return <div>Ошибка сети или сервера</div>;
  if (!converter.data) return null;
  if (converter.data.status === "error") {
    return <div>{converter.data.message}</div>;
  }

  return <CurrencyView state={converter.state} actions={converter.actions} />;
};

export default CurrencyContainer;
