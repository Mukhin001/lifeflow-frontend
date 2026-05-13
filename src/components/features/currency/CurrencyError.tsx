import Button from "../../ui/button/Button";

interface Props {
  status: string;
  message: string;
  onRetry: () => void;
}

const CurrencyError = ({ status, message, onRetry }: Props) => {
  return (
    <div>
      <p>{status}</p>
      <p>{message}</p>
      <Button onClick={onRetry}>Повторить запрос</Button>
    </div>
  );
};

export default CurrencyError;
