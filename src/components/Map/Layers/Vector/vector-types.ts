import Map from "ol/Map";
import Feature from "ol/Feature";
import { PropertyPreviewDTO } from "../../../../api";

export type TVectorLayerProps = {};

export type TVectorLayerComponentProps = TVectorLayerProps & {
  map: Map;
  features?: Feature[];
  properties?: PropertyPreviewDTO[] | null;
};
