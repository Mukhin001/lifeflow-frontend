import Select from "../../ui/select/Select";
import { CURRENCIES } from "./model/constants";

interface Props {
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  exclude: string;
}

const CurrencySelect = ({ value, onChange, disabled, exclude }: Props) => {
  return (
    <Select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    >
      {CURRENCIES.filter((c) => c !== exclude).map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </Select>
  );
};

export default CurrencySelect;
