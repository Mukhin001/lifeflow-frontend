export const calculateCurrency = (
  value: string,
  rateValue: number,
  reverse = false,
) => {
  if (value.trim() === "") {
    return "";
  }
  const num = Number(value);

  if (Number.isNaN(num) || !rateValue) {
    return "";
  }

  return reverse ? (num / rateValue).toFixed(2) : (num * rateValue).toFixed(2);
};
