type ApiStatus = "ok" | "error" | "denied";
export type RoutePoint = [number, number][];
export type GeoStatus = "loading" | "ready" | "denied" | "error";
export type Mode = "start" | "end";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface SendLocationResponse {
  status: ApiStatus;
  message: string;
  received?: Coordinates;
}

export interface MapViewProps {
  startPoint: Coordinates;
  endPoint: Coordinates | null;
  route: RoutePoint;
  mode: Mode;
  handleSelectStartPoint: (p: Coordinates) => void;
  handleSelectEndPoint: (p: Coordinates) => void;
  disabled: boolean;
}

export interface MapEventsProps {
  mode: Mode;
  setStartPoint: (p: Coordinates) => void;
  setEndPoint: (p: Coordinates) => void;
}

export interface MapControlsProps {
  mode: Mode;
  setMode: (m: Mode) => void;
  disabled?: boolean;
  handleResetRoute: () => void;
}
