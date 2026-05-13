import Input from "../../ui/select/Input";

interface Props {
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}

const AmountInput = ({ value, onChange, disabled }: Props) => {
  return (
    <Input
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Введите сумму"
    />
  );
};

export default AmountInput;
