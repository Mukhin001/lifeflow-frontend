export type Coordinates = {
  lat: number;
  lng: number;
};

export type GeoStatus = "loading" | "ready" | "denied" | "error";

export type Mode = "start" | "end";

export type SendLocationResponse = {
  status: "ok" | "error" | "denied";
  message: string;
  received?: Coordinates;
};

export type MapViewProps = {
  startPoint: Coordinates;
  endPoint: Coordinates | null;
  route: [number, number][];
  mode: Mode;
  setStartPoint: (p: Coordinates) => void;
  setEndPoint: (p: Coordinates) => void;
  setMode: (m: Mode) => void;
};

export type MapEventsProps = {
  mode: Mode;
  setStartPoint: (p: Coordinates) => void;
  setEndPoint: (p: Coordinates) => void;
};

export type MapControlsProps = {
  mode: Mode;
  setMode: (m: Mode) => void;
};
