"use client";

import { useState } from "react";
import { useUserLocation } from "./hooks/useUserLocation";
import { Coordinates, Mode } from "./model/types";
import { useRoute } from "./hooks/useRoute";
import MapControls from "./MapControls";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
});

const MapContainer = () => {
  const { startPoint, status, setStartPoint } = useUserLocation();
  const [endPoint, setEndPoint] = useState<Coordinates | null>(null);
  const [mode, setMode] = useState<Mode>("end");

  const route = useRoute(startPoint, endPoint);

  if (status === "loading") return <div>Загрузка...</div>;

  return (
    <>
      {status === "denied" && (
        <div>
          Вы запретили доступ к геолокации. Локация будет по умолчанию (Москва).
        </div>
      )}

      {status === "error" && <div>Ошибка получения геолокации</div>}

      <MapControls mode={mode} setMode={setMode} setEndPoint={setEndPoint} />
      <div style={{ marginBottom: 6 }}>
        {mode === "start"
          ? "Кликните по карте, чтобы выбрать старт"
          : "Кликните по карте, чтобы выбрать точку назначения"}
      </div>
      <MapView
        startPoint={startPoint}
        endPoint={endPoint}
        mode={mode}
        setMode={setMode}
        route={route}
        setStartPoint={setStartPoint}
        setEndPoint={setEndPoint}
      />
    </>
  );
};

export default MapContainer;
