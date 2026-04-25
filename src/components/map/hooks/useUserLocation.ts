import { useEffect, useState } from "react";
import { GeoStatus, Coordinates } from "../model/types";
import { DEFAULT_LOCATION } from "../model/constants";

export const useUserLocation = () => {
  const [startPoint, setStartPoint] = useState<Coordinates>(DEFAULT_LOCATION);
  const [status, setStatus] = useState<GeoStatus>("loading");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setStartPoint({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setStatus("ready");
      },
      (error) => {
        setStartPoint(DEFAULT_LOCATION);

        if (error.code === error.PERMISSION_DENIED) {
          setStatus("denied");
        } else {
          setStatus("error");
        }

        console.error("Geolocation error:", error);
      },
    );
  }, []);

  return { startPoint, status, setStartPoint };
};
