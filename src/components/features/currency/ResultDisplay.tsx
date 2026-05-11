import { Rates } from "@/src/api/currency/currency.types";
import { CURRENCIES } from "./model/constants";

interface Props {
  rate: number;
  rates: Rates;
  leftCurrency: string;
  rightCurrency: string;
}

const ResultDisplay = ({ rate, rates, leftCurrency, rightCurrency }: Props) => {
  const formatter = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const rateDescription = rate
    ? `1 ${leftCurrency} = ${formatter.format(rate)} ${rightCurrency}`
    : "";

  const getCrossRate = (from: string, to: string, rates: Rates) => {
    const fromRate = rates[from];
    const toRate = rates[to];

    if (fromRate === null || toRate === null) {
      return null;
    }

    return toRate / fromRate;
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>{rateDescription}</h3>

      <ul>
        {CURRENCIES.map((currency) => {
          if (currency === rightCurrency) return null;

          const crossRate = getCrossRate(currency, rightCurrency, rates);

          if (!crossRate) return null;

          return (
            <li key={currency}>
              {currency} / {rightCurrency} {formatter.format(crossRate)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ResultDisplay;
