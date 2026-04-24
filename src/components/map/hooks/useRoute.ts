import { useEffect, useState } from "react";
import { LatLng } from "../location.types";
import { getRoute } from "../route";

export const useRoute = (startPoint: LatLng, endPoint: LatLng | null) => {
  const [route, setRoute] = useState<[number, number][]>([]);

  useEffect(() => {
    if (!startPoint || !endPoint) return;

    getRoute(startPoint, endPoint).then(setRoute).catch(console.error);
  }, [startPoint, endPoint]);

  return route;
};
