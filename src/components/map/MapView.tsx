"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import { LatLng, Mode } from "./location.types";

// 🎨 иконки
const startIcon = new L.Icon({
  iconUrl: "/icons/location_.png",
  iconSize: [41, 41],
  iconAnchor: [20, 41],
});

const endIcon = new L.Icon({
  iconUrl: "/icons/location_red.png",
  iconSize: [41, 41],
  iconAnchor: [20, 41],
});

type Props = {
  startPoint: LatLng;
  endPoint: LatLng | null;
  route: [number, number][];
  mode: Mode;
  setStartPoint: (p: LatLng) => void;
  setEndPoint: (p: LatLng) => void;
  setMode: (m: Mode) => void;
};

type PPP = {
  mode: Mode;
  setStartPoint: (p: LatLng) => void;
  setEndPoint: (p: LatLng) => void;
};

// 📍 обработка кликов
const MapEvents = ({ mode, setStartPoint, setEndPoint }: PPP): null => {
  useMapEvents({
    click(e) {
      const point = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };

      if (mode === "start") {
        setStartPoint(point);
      } else {
        setEndPoint(point);
      }
    },
  });

  return null;
};

const MapView = ({
  startPoint,
  endPoint,
  route,
  mode,
  setStartPoint,
  setEndPoint,
  setMode,
}: Props) => {
  return (
    <>
      {/* 🎛️ управление */}
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setMode("start")}>Выбрать старт</button>
        <button onClick={() => setMode("end")}>Выбрать финиш</button>
        <span style={{ marginLeft: 10 }}>
          Режим: {mode === "start" ? "старт" : "финиш"}
        </span>
      </div>

      {/* 🗺 карта */}
      <MapContainer
        center={[startPoint.lat, startPoint.lng]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
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

        <MapEvents
          mode={mode}
          setStartPoint={setStartPoint}
          setEndPoint={setEndPoint}
        />
      </MapContainer>
    </>
  );
};

export default MapView;
