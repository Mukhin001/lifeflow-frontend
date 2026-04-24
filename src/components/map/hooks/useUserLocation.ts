import { useEffect, useState } from "react";
import { GeoStatus, LatLng } from "../location.types";

const DEFAULT_LOCATION: LatLng = {
  lat: 55.751244,
  lng: 37.618423,
};

export const useUserLocation = () => {
  const [startPoint, setStartPoint] = useState<LatLng>(DEFAULT_LOCATION);
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
      () => {
        setStartPoint({ lat: 55.751244, lng: 37.618423 });
        setStatus("denied");
      },
    );
  }, []);

  return { startPoint, status, setStartPoint };
};
