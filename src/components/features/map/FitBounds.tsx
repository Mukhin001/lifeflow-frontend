import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { RoutePoint } from "./model/types";

const FitBounds = ({ route }: { route: RoutePoint }) => {
  const map = useMap();

  useEffect(() => {
    if (route.length > 0) {
      map.fitBounds(route);
    }
  }, [route, map]);

  return null;
};

export default FitBounds;
