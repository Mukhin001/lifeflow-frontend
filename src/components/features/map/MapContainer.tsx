"use client";

import { useState } from "react";
import { useUserLocation } from "./hooks/useUserLocation";
import { Coordinates, Mode } from "./model/types";
import MapControls from "./MapControls";
import dynamic from "next/dynamic";
import { useCalculateRouteMutation } from "@/src/api/route/routeApi";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
});

const MapContainer = () => {
  const [calculateRoute, { data, isLoading, error }] =
    useCalculateRouteMutation();
  const { startPoint, status, setStartPoint } = useUserLocation();
  const [endPoint, setEndPoint] = useState<Coordinates | null>(null);
  const [mode, setMode] = useState<Mode>("end");
  const route = endPoint ? (data?.route ?? []) : [];

  const handleSelectEndPoint = async (point: Coordinates) => {
    setEndPoint(point);

    try {
      await calculateRoute({
        start: startPoint,
        end: point,
      }).unwrap();
    } catch (e) {
      console.error("Ошибка построения маршрута", e);
    }
  };

  const handleSelectStartPoint = async (point: Coordinates) => {
    setStartPoint(point);

    if (!endPoint) return;

    try {
      await calculateRoute({
        start: point,
        end: endPoint,
      }).unwrap();
    } catch (e) {
      console.error("Ошибка изменения старта", e);
    }
  };

  const handleResetRoute = () => {
    setEndPoint(null);
    setMode("end");
  };

  if (status === "loading") return <div>Загрузка...</div>;
  if (error) console.error(error);

  return (
    <>
      {status === "denied" && (
        <div>
          Вы запретили доступ к геолокации. Локация будет по умолчанию (Москва).
        </div>
      )}

      {status === "error" && <div>Ошибка получения геолокации</div>}

      <MapControls
        mode={mode}
        setMode={setMode}
        disabled={isLoading}
        handleResetRoute={handleResetRoute}
      />
      <div style={{ marginBottom: 6 }}>
        {mode === "start"
          ? "Кликните по карте, чтобы выбрать старт"
          : "Кликните по карте, чтобы выбрать точку назначения"}
      </div>
      {isLoading && <h3 className="overlay">Строим маршрут...</h3>}
      {error && (
        <h3 className="overlay">
          Ошибка маршрута (проверь соединение или координаты)
        </h3>
      )}
      <div style={{ position: "relative" }}>
        {isLoading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(255,255,255,0.4)",
              zIndex: 1000,
              cursor: "not-allowed",
            }}
          />
        )}

        <MapView
          startPoint={startPoint}
          endPoint={endPoint}
          mode={mode}
          route={route}
          handleSelectStartPoint={handleSelectStartPoint}
          handleSelectEndPoint={handleSelectEndPoint}
          disabled={isLoading}
        />
      </div>
    </>
  );
};

export default MapContainer;
