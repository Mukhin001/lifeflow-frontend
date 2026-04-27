import { useEffect } from "react";
import { useMap } from "react-leaflet";

const FitBounds = ({ route }: { route: [number, number][] }) => {
  const map = useMap();

  useEffect(() => {
    if (route.length > 0) {
      map.fitBounds(route);
    }
  }, [route, map]);

  return null;
};

export default FitBounds;
