"use client";

import { useGetRatesQuery } from "@/src/api/currency/currencyApi";
import { useState } from "react";

const CURRENCIES = ["USD", "EUR", "RUB", "GBP", "JPY"];

const CurrencyPage = () => {
  const [base, setBase] = useState("USD");

  const { data, isLoading, isFetching, error } = useGetRatesQuery(base);

  if (isLoading) return <div>Загрузка курсов...</div>;
  if (error) return <div>Ошибка сети или сервера</div>;
  if (!data) return null;
  if (data.status === "error") {
    return <div>{data.message}</div>;
  }

  const rates = data.rates;

  return (
    <div style={{ padding: 20 }}>
      <h2>Курсы валют</h2>

      {isFetching && <div>Обновляем курсы...</div>}

      <div
        style={{
          opacity: isFetching ? 0.5 : 1,
          pointerEvents: isFetching ? "none" : "auto",
        }}
      >
        <select value={base} onChange={(e) => setBase(e.target.value)}>
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div style={{ marginTop: 20 }}>
          <h3>Базовая валюта: {data.base}</h3>

          <ul>
            {CURRENCIES.map((currency) => (
              <li key={currency}>
                {currency}: {rates[currency]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CurrencyPage;
