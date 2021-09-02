import Map from "ol/Map";
import Feature from "ol/Feature";
import { PropertyPreviewDTO } from "../../../../api";

export type TVectorLayerProps = {};

export type TVectorLayerComponentProps = TVectorLayerProps & {
  map: Map;
  features?: Feature[];
};

export type PropertyProps = TVectorLayerProps & {
  map: Map;
  editable: boolean;
  properties?: PropertyPreviewDTO[] | null;
};
