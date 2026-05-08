"use client";

import { useGetRatesQuery } from "@/src/api/currency/currencyApi";
import { useState } from "react";
import CurrencyView from "./CurrencyView";

const CurrencyContainer = () => {
  const [amount, setAmount] = useState("1");
  const [activeField, setActiveField] = useState<"left" | "right">("left");
  const [leftCurrency, setLeftCurrency] = useState("USD");
  const [rightCurrency, setRightCurrency] = useState("RUB");

  const { data, isLoading, isFetching, error } = useGetRatesQuery(leftCurrency);

  if (isLoading) return <div>Загрузка курсов...</div>;
  if (error) return <div>Ошибка сети или сервера</div>;
  if (!data) return null;
  if (data.status === "error") {
    return <div>{data.message}</div>;
  }

  const rates = data.rates;
  const rate = rates[rightCurrency];

  const calculate = (value: string, rateValue: number, reverse = false) => {
    const num = Number(value);

    if (Number.isNaN(num) || !rateValue) {
      return "";
    }

    return reverse
      ? (num / rateValue).toFixed(2)
      : (num * rateValue).toFixed(2);
  };

  const handleLeftAmount = (value: string) => {
    setActiveField("left");
    setAmount(value);
  };

  const handleRightAmount = (value: string) => {
    setActiveField("right");
    setAmount(value);
  };

  const handleLeftCurrency = (value: string) => {
    setLeftCurrency(value);
  };

  const handleRightCurrency = (value: string) => {
    setRightCurrency(value);
  };

  const leftValue =
    activeField === "left" ? amount : calculate(amount, rate, true);

  const rightValue = activeField === "right" ? amount : calculate(amount, rate);

  return (
    <>
      <CurrencyView
        state={{
          leftValue,
          rightValue,
          isLoading,
          isFetching,
          rates,
          rate,
          leftCurrency,
          rightCurrency,
        }}
        actions={{
          handleLeftAmount,
          handleRightAmount,
          handleLeftCurrency,
          handleRightCurrency,
        }}
      />
    </>
  );
};

export default CurrencyContainer;
