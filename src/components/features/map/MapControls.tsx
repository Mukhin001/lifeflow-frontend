import { MapControlsProps } from "./model/types";

const getButtonStyle = (active: boolean): React.CSSProperties => ({
  padding: "6px 12px",
  marginRight: 8,
  borderRadius: 6,
  border: "1px solid",
  cursor: "pointer",
  backgroundColor: active ? "#3B82F6" : "#E5E7EB",
  color: active ? "#fff" : "#111",
  borderColor: active ? "#3B82F6" : "#ccc",
});

const MapControls = ({ mode, setMode, setEndPoint }: MapControlsProps) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <button
        onClick={() => setMode("start")}
        style={getButtonStyle(mode === "start")}
      >
        Выбрать старт
      </button>
      <button
        onClick={() => setMode("end")}
        style={getButtonStyle(mode === "end")}
      >
        Выбрать финиш
      </button>
      <button onClick={() => setEndPoint(null)}> Сбросить маршрут</button>
      <span style={{ marginLeft: 10 }}>
        Режим: {mode === "start" ? "выбор старта" : "выбор финиша"}
      </span>
    </div>
  );
};

export default MapControls;
