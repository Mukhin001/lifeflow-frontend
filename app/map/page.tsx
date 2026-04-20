"use client";

import { useSendLocationMutation } from "@/src/api/location/locationApi";
import { useEffect, useState } from "react";

type Coords = { lat: number; lng: number };

const MapPage = () => {
  const [coords, setCoords] = useState<null | Coords>(null);
  const [sendLocation] = useSendLocationMutation();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setCoords(newCoords);

        sendLocation(newCoords)
          .unwrap()
          .then((res) => {
            console.log("Server response:", res);
          })
          .catch((err) => {
            console.error("Server error:", err);
          });
      },

      (error) => {
        console.error("Geolocation error:", error);
        setCoords(null);
        sendLocation({
          lat: 0,
          lng: 0,
        });
        // 👇 обработка отказа пользователя
        if (error.code === error.PERMISSION_DENIED) {
          alert("Ты отклонил доступ к геолокации ❌");
        } else {
          alert("Не удалось получить геолокацию");
        }
      },
    );
  }, []);

  return (
    <main>
      <h1>Map</h1>

      {coords ? (
        <p>
          {" "}
          Lat: {coords.lat}, Lng: {coords.lng}
        </p>
      ) : (
        <p>Getting location...</p>
      )}
    </main>
  );
};

export default MapPage;
