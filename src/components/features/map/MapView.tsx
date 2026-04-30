"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";

import { Coordinates, MapViewProps } from "./model/types";
import { endIcon, startIcon } from "./model/mapIcons";
import MapEvents from "./MapEvents";
import FitBounds from "./FitBounds";

const MapView = ({
  startPoint,
  endPoint,
  route,
  mode,
  handleSelectStartPoint,
  handleSelectEndPoint,
  disabled,
}: MapViewProps) => {
  const handleMapClick = (point: Coordinates) => {
    if (disabled) return;

    if (mode === "start") {
      handleSelectStartPoint(point);
    } else {
      handleSelectEndPoint(point);
    }
  };
  return (
    <MapContainer
      center={[startPoint.lat, startPoint.lng]}
      zoom={13}
      style={{
        height: "500px",
        width: "100%",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 🟢 старт */}
      <Marker position={[startPoint.lat, startPoint.lng]} icon={startIcon}>
        <Popup>Старт</Popup>
      </Marker>

      {/* 🔴 финиш */}
      {endPoint && (
        <Marker position={[endPoint.lat, endPoint.lng]} icon={endIcon}>
          <Popup>Финиш</Popup>
        </Marker>
      )}

      {/* 🛣 маршрут */}
      {route.length > 0 && <Polyline positions={route} />}

      <MapEvents onClick={handleMapClick} />

      <FitBounds route={route} />
    </MapContainer>
  );
};

export default MapView;
