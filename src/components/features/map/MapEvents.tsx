import { useMapEvents } from "react-leaflet";
import { Coordinates } from "./model/types";

const MapEvents = ({ onClick }: { onClick: (p: Coordinates) => void }) => {
  useMapEvents({
    click(e) {
      onClick({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
};

export default MapEvents;
