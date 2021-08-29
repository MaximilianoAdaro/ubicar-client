import Map from "ol/Map";
import { MapView } from "../../store/slices/map/mapSlice";
import React from "react";
import TileLayer from "ol/layer/Tile";
import BaseLayer from "ol/layer/Base";
import { PropertyPreviewDTO } from "../../api";
import { Feature } from "ol";
import { Geometry } from "ol/geom";

export type TMapProps = {
  handleChangeClick?: (lat: number, lon: number) => void | null;
  zoom: number;
  view: MapView;
  renderLayers?: boolean | null;
  additionalStyle?: React.CSSProperties | null;
  additionalLayers?: TileLayer | null;
  properties?: PropertyPreviewDTO[] | null;
  editable?: boolean | null;
};

export type PropertyState = {
  visible: boolean;
  properties: PropertyPreviewDTO[];
  propsGeom: Feature<Geometry>[];
};

export type TMapState = {
  mapContext?: IMapContext;
  zoom: number;
  view: MapView;
  markerLayer: BaseLayer | null;
  properties?: PropertyPreviewDTO[] | null;
};

export interface IMapContext {
  map: Map;
}
