import { useState } from "react";
import { useGetRatesQuery } from "@/src/api/currency/currencyApi";

import { calculateCurrency } from "../model/calculateCurrency";
import { CurrencyConverterResult, Field } from "../model/types";

export const useCurrencyConverter = (): CurrencyConverterResult => {
  const [amount, setAmount] = useState("1");
  const [activeField, setActiveField] = useState<Field>("left");
  const [leftCurrency, setLeftCurrency] = useState("USD");
  const [rightCurrency, setRightCurrency] = useState("RUB");

  const { data, isLoading, isFetching, error, refetch } =
    useGetRatesQuery(leftCurrency);

  const handleRetry = (): void => {
    refetch();
  };

  if (isLoading) {
    return {
      status: "loading",
    };
  }

  if (error) {
    return {
      status: "network-error",
      message: "Ошибка сети",
      actions: {
        handleRetry,
      },
    };
  }

  if (!data || data.status === "error") {
    return {
      status: "error",
      message: data?.message || "Ошибка получения курсов",
      actions: {
        handleRetry,
      },
    };
  }

  const rates = data.rates;

  const rate = rates[rightCurrency];

  const leftValue =
    activeField === "left" ? amount : calculateCurrency(amount, rate, true);

  const rightValue =
    activeField === "right" ? amount : calculateCurrency(amount, rate);

  const handleAmountChange = (field: Field, value: string) => {
    setActiveField(field);
    setAmount(value);
  };

  const handleCurrencyChange = (field: Field, value: string) => {
    if (field === "left") {
      setLeftCurrency(value);
    } else {
      setRightCurrency(value);
    }
  };

  return {
    status: "success",
    state: {
      leftValue,
      rightValue,
      leftCurrency,
      rightCurrency,
      isLoading,
      isFetching,
      rates,
      rate,
    },
    actions: {
      handleAmountChange,
      handleCurrencyChange,
    },
  };
};
