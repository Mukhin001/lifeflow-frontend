import { useState } from "react";
import { useGetRatesQuery } from "@/src/api/currency/currencyApi";

import { calculateCurrency } from "../model/calculateCurrency";
import { Field } from "../model/types";

export const useCurrencyConverter = () => {
  const [amount, setAmount] = useState("1");

  const [activeField, setActiveField] = useState<Field>("left");

  const [leftCurrency, setLeftCurrency] = useState("USD");

  const [rightCurrency, setRightCurrency] = useState("RUB");

  const { data, isLoading, isFetching, error } = useGetRatesQuery(leftCurrency);

  const rates = data && data.status === "ok" ? data.rates : {};

  const rate = rates[rightCurrency] ?? 0;

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

  const state = {
    leftValue,
    rightValue,
    leftCurrency,
    rightCurrency,
    isLoading,
    isFetching,
    rates,
    rate,
  };

  const actions = {
    handleAmountChange,
    handleCurrencyChange,
  };

  return {
    state,
    actions,
    data,
    error,
    isLoading,
    isFetching,
  };
};
