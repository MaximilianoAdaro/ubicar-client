import Map from "ol/Map";
import { MapView } from "../../store/slices/map/mapSlice";
import React from "react";
import TileLayer from "ol/layer/Tile";
import BaseLayer from "ol/layer/Base";

export type TMapProps = {
  handleChangeClick?: (lat: number, lon: number) => void | null;
  zoom: number;
  view: MapView;
  renderLayers?: boolean | null;
  additionalStyle?: React.CSSProperties | null;
  additionalLayers?: TileLayer | null;
  editable: boolean;
  setZoom: (arg0: number) => void;
  setView: (arg0: MapView) => void;
  setBbox: (arg0: number[]) => void;
  body: string;
  showControls?: boolean;
};

export type PropertyState = {
  visible: boolean;
};

export type TMapState = {
  mapContext?: IMapContext;
  zoom: number;
  view: MapView;
  markerLayer: BaseLayer | null;
  editable: boolean;
};

export interface IMapContext {
  map: Map;
}
