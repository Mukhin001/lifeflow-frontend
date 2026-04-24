"use client";

import { useState } from "react";
import { useUserLocation } from "./hooks/useUserLocation";
import { LatLng, Mode } from "./location.types";
import { useRoute } from "./hooks/useRoute";
import MapView from "./MapView";

const MapContainer = () => {
  const { startPoint, status, setStartPoint } = useUserLocation();
  const [endPoint, setEndPoint] = useState<LatLng | null>(null);
  const [mode, setMode] = useState<Mode>("end");

  const route = useRoute(startPoint, endPoint);

  if (status === "loading") return <div>Загрузка...</div>;

  return (
    <MapView
      startPoint={startPoint}
      endPoint={endPoint}
      mode={mode}
      setMode={setMode}
      route={route}
      setStartPoint={setStartPoint}
      setEndPoint={setEndPoint}
    />
  );
};

export default MapContainer;
