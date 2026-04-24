export type SendLocationRequest = { lat: number; lng: number };

export type SendLocationResponse = {
  status: "ok" | "error" | "denied";
  message: string;
  received?: {
    lat: number;
    lng: number;
  };
};
