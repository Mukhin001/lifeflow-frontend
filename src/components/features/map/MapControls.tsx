import Button from "../../ui/button/Button";
import { MapControlsProps } from "./model/types";

const MapControls = ({
  mode,
  setMode,
  disabled,
  handleResetRoute,
}: MapControlsProps) => {
  return (
    <div>
      <Button
        disabled={disabled}
        active={mode === "start"}
        onClick={() => setMode("start")}
      >
        Выбрать старт
      </Button>
      <Button
        disabled={disabled}
        active={mode === "end"}
        onClick={() => setMode("end")}
      >
        Выбрать финиш
      </Button>
      <Button
        disabled={disabled}
        variant="secondary"
        onClick={handleResetRoute}
      >
        Сбросить маршрут
      </Button>
      <span>Режим: {mode === "start" ? "выбор старта" : "выбор финиша"}</span>
    </div>
  );
};

export default MapControls;
