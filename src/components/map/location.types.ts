export type LatLng = {
  lat: number;
  lng: number;
};

export type GeoStatus = "loading" | "ready" | "denied";

export type Mode = "start" | "end";

export type SendLocationResponse = {
  status: "ok" | "error" | "denied";
  message: string;
  received?: LatLng;
};
