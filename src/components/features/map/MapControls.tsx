import { MapControlsProps } from "./model/types";

const getButtonStyle = (
  active: boolean,
  disabled?: boolean,
): React.CSSProperties => ({
  padding: "6px 12px",
  marginRight: 8,
  borderRadius: 6,
  border: "1px solid",
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.5 : 1,
  backgroundColor: active ? "#3B82F6" : "#E5E7EB",
  color: active ? "#fff" : "#111",
  borderColor: active ? "#3B82F6" : "#ccc",
});

const MapControls = ({
  mode,
  setMode,
  disabled,
  handleResetRoute,
}: MapControlsProps) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <button
        disabled={disabled}
        onClick={() => setMode("start")}
        style={getButtonStyle(mode === "start", disabled)}
      >
        Выбрать старт
      </button>
      <button
        disabled={disabled}
        onClick={() => setMode("end")}
        style={getButtonStyle(mode === "end", disabled)}
      >
        Выбрать финиш
      </button>
      <button disabled={disabled} onClick={handleResetRoute}>
        Сбросить маршрут
      </button>
      <span style={{ marginLeft: 10 }}>
        Режим: {mode === "start" ? "выбор старта" : "выбор финиша"}
      </span>
    </div>
  );
};

export default MapControls;
