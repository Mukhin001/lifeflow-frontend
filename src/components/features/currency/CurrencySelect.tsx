import { CURRENCIES } from "./model.ts/constants";

type Props = {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  exclude?: string;
};

const CurrencySelect = ({ value, onChange, disabled, exclude }: Props) => {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    >
      {CURRENCIES.filter((c) => c !== exclude).map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelect;
