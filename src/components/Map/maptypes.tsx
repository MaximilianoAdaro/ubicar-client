import Map from "ol/Map";
import { MapView } from "../../store/slices/map/mapSlice";
import React from "react";
import TileLayer from "ol/layer/Tile";
import BaseLayer from "ol/layer/Base";
import { PropertyPreviewDTO } from "../../api";

export type TMapProps = {
  zoom: number;
  view: MapView;
  renderLayers?: boolean | null;
  additionalStyle?: React.CSSProperties | null;
  additionalLayers?: TileLayer | null;
  properties?: PropertyPreviewDTO[] | null;
};

export type PropertyState = {
  visible: boolean;
  properties: PropertyPreviewDTO[];
};

export type TMapState = {
  mapContext?: IMapContext;
  zoom: number;
  view: MapView;
  editable: boolean;
  markerLayer: BaseLayer | null;
  properties?: PropertyPreviewDTO[] | null;
};

export interface IMapContext {
  map: Map;
}
