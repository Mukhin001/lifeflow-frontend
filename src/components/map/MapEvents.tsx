import { useMapEvents } from "react-leaflet";
import { MapEventsProps } from "./model/types";

const MapEvents = ({
  mode,
  setStartPoint,
  setEndPoint,
}: MapEventsProps): null => {
  useMapEvents({
    click(e) {
      const point = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };

      if (mode === "start") {
        setStartPoint(point);
      } else {
        setEndPoint(point);
      }
    },
  });

  return null;
};

export default MapEvents;
