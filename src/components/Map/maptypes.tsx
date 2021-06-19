import Map from "ol/Map";
import { MapView } from "../../store/slices/map/mapSlice";

export type TMapProps = {
  zoom: number;
  view: MapView;
};

export type TMapState = {
  mapContext?: IMapContext;
};

export interface IMapContext {
  map: Map;
}
