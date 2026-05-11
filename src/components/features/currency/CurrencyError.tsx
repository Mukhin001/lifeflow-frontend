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
      <button onClick={onRetry}> Повторить запрос</button>
    </div>
  );
};

export default CurrencyError;
