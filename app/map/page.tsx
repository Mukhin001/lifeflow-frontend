"use client";

import { SendLocationRequest } from "@/src/api/location/location.types";
import { useSendLocationMutation } from "@/src/api/location/locationApi";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Map = dynamic(() => import("@/src/components/map/Map"), {
  ssr: false,
});

const MapPage = () => {
  const [coords, setCoords] = useState<null | SendLocationRequest>(null);
  const [sendLocation] = useSendLocationMutation();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCoords: SendLocationRequest = {
          type: "success",
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log(newCoords);

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
        sendLocation({ type: "denied" });
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

      {coords?.type === "success" ? (
        <>
          <p>
            {" "}
            Lat: {coords.lat}, Lng: {coords.lng}
          </p>
          <Map lat={coords.lat} lng={coords.lng} />
        </>
      ) : (
        <p>Getting location...</p>
      )}
    </main>
  );
};

export default MapPage;
