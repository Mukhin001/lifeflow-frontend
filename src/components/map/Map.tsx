"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: string })
  ._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// const userIcon = new L.Icon({
//   iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
//   iconSize: [41, 41],
//   iconAnchor: [12, 41],
// });

// const clickIcon = new L.Icon({
//   iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
//   iconSize: [41, 41],
//   iconAnchor: [12, 41],
// });

type Props = {
  lat: number;
  lng: number;
};

type Position = {
  lat: number;
  lng: number;
};

// const LocationMarker = () => {
//   const [position, setPosition] = useState<Position | null>(null);
//   const map = useMapEvents({
//     click(e) {
//       setPosition({
//         lat: e.latlng.lat,
//         lng: e.latlng.lng,
//       });
//     },
//     locationfound(e) {
//       const coords = {
//         lat: e.latlng.lat,
//         lng: e.latlng.lng,
//       };

//       setPosition(coords);
//       map.flyTo(e.latlng, map.getZoom());
//     },
//   });

//   return position ? (
//     <Marker position={[position.lat, position.lng]} icon={clickIcon}>
//       <Popup></Popup>
//     </Marker>
//   ) : null;
// };

// const Map = ({ lat, lng }: Props) => {
//   return (
//     <MapContainer
//       center={[lat, lng]}
//       zoom={13}
//       style={{ height: "400px", width: "100%" }}
//     >
//       <TileLayer
//         attribution="&copy; OpenStreetMap"
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       <Marker position={[lat, lng]} icon={userIcon}>
//         <Popup></Popup>
//       </Marker>

//       <LocationMarker />
//     </MapContainer>
//   );
// };

type Pr = {
  lat: number;
  lng: number;
  setRoute: Dispatch<SetStateAction<[number, number][]>>;
  setClickPosition: Dispatch<SetStateAction<Position | null>>;
};

const MapEvents = ({ lat, lng, setClickPosition, setRoute }: Pr) => {
  useMapEvents({
    async click(e) {
      const newPoint = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };

      setClickPosition(newPoint);

      // 🚀 запрос маршрута
      try {
        const res = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${lng},${lat};${newPoint.lng},${newPoint.lat}?overview=full&geometries=geojson`,
        );

        const data = await res.json();

        const coords = data.routes[0].geometry.coordinates;

        // преобразуем [lng, lat] → [lat, lng]
        const formatted = coords.map((c: [number, number]) => [c[1], c[0]]);

        setRoute(formatted);
      } catch (err) {
        console.error("Route error:", err);
      }
    },
  });

  return null;
};

const Map = ({ lat, lng }: Props) => {
  const [clickPosition, setClickPosition] = useState<Position | null>(null);
  const [route, setRoute] = useState<[number, number][]>([]);
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 👇 твоя позиция */}
      <Marker position={[lat, lng]}>
        <Popup>Ты здесь 📍</Popup>
      </Marker>

      {/* 👇 точка клика */}
      {clickPosition && (
        <Marker position={[clickPosition.lat, clickPosition.lng]}>
          <Popup>Точка назначения</Popup>
        </Marker>
      )}

      {/* 👇 маршрут */}
      {route.length > 0 && <Polyline positions={route} />}

      <MapEvents
        lat={lat}
        lng={lng}
        setClickPosition={setClickPosition}
        setRoute={setRoute}
      />
    </MapContainer>
  );
};

export default Map;
