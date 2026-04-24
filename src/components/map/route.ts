import { LatLng } from "./location.types";

export const getRoute = async (start: LatLng, end: LatLng) => {
  const res = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`,
  );

  const data = await res.json();

  return data.routes[0].geometry.coordinates.map((c: [number, number]) => [
    c[1],
    c[0],
  ]);
};
