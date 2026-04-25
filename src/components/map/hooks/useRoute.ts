import { useEffect, useState } from "react";
import { Coordinates } from "../model/types";
import { getRoute } from "../model/route";

export const useRoute = (
  startPoint: Coordinates,
  endPoint: Coordinates | null,
) => {
  const [route, setRoute] = useState<[number, number][]>([]);

  useEffect(() => {
    if (!endPoint) return;

    getRoute(startPoint, endPoint).then(setRoute).catch(console.error);
  }, [startPoint, endPoint]);

  return route;
};
