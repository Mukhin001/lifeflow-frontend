type Route = [number, number][];
type Status = "ok" | "error";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface CalculateRouteRequest {
  start: Coordinates;
  end: Coordinates | null;
}

export interface CalculateRouteResponse {
  status: Status;
  route?: Route;
  message?: string;
}
