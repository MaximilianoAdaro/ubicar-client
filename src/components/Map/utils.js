import * as ol from "ol";
import { GeoJSON } from "ol/format";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { transform, transformExtent } from "ol/proj";

// GET OPEN STREET MAP LAYER
export function getOSMLayer() {
  const rebuildParams = {
    sourceType: "OSM",
  };
  return new TileLayer({
    rebuildParams: rebuildParams,
    source: new OSM(),
    crossOrigin: "anonymous",
  });
}

export const convertCoordinates = (lon, lat) => {
  let x = (lon * 20037508.34) / 180;
  let y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180);
  y = (y * 20037508.34) / 180;
  return [x, y];
};

export function scaleToResolution(scale, map) {
  const DOTS_PER_INCH = 96;
  const INCHES_PER_METER = 39.37;
  const pointResolution =
    parseFloat(scale) / (DOTS_PER_INCH * INCHES_PER_METER);
  let projection = map.getView().getProjection();
  return pointResolution / projection.getMetersPerUnit();
}

// GET CURRENT MAP SCALE
export function getMapScale() {
  const DOTS_PER_INCH = 96;
  const INCHES_PER_METER = 39.37;
  let resolution = window.map.getView().getResolution();
  let projection = window.map.getView().getProjection();
  const pointResolution = projection.getMetersPerUnit() * resolution;
  return Math.round(pointResolution * DOTS_PER_INCH * INCHES_PER_METER);
}

// SET CURRENT MAP SCALE
export function setMapScale(scale) {
  const DOTS_PER_INCH = 96;
  const INCHES_PER_METER = 39.37;
  const pointResolution =
    parseFloat(scale) / (DOTS_PER_INCH * INCHES_PER_METER);
  let projection = window.map.getView().getProjection();
  let resolution = pointResolution / projection.getMetersPerUnit();
  window.map.getView().setResolution(resolution);
}

export function zoomToFeature(map, feature, animate = true) {
  let geom = feature.getGeometry();
  let duration = animate ? 1000 : 0;
  let minResolution = scaleToResolution(feature.minScale, map);
  minResolution = minResolution > 1 ? Math.ceil(minResolution) : 1;
  if (geom.getType() === "Point") {
    map
      .getView()
      .fit(geom, { duration: duration, minResolution: minResolution });
  } else if (geom.getType() === "GeometryCollection") {
    map.getView().fit(geom.getGeometries()[0], {
      duration: duration,
      minResolution: minResolution,
    });
  } else {
    map
      .getView()
      .fit(geom, { duration: duration, minResolution: minResolution });
  }
}

export function centerMap(coords, zoom) {
  let extent = window.map.getView().calculateExtent();
  let xMin = extent[0];
  let xMax = extent[2];
  let total = (Math.abs(xMin) - Math.abs(xMax)) * 0.04;
  let newCoords = [coords[0] - total, coords[1]];
  let newExtent = [extent[0], extent[1], extent[2], total];

  window.map.setView(
    new ol.View({
      center: newCoords,
      extent: newExtent,
      zoom: zoom,
    })
  );
}

// GET FEATURE FROM GEOJSON
export function getFeatureFromGeoJSON(geoJSON) {
  return new GeoJSON().readFeature(geoJSON);
}

export function saveToStorage(storageKey, item) {
  localStorage.setItem(storageKey, JSON.stringify(item));
}

export function appendToStorage(storageKey, item, limit = undefined) {
  let items = getItemsFromStorage(storageKey);
  if (items === undefined) items = [];
  item.dateAdded = new Date().toLocaleString();
  items.unshift(item);
  if (limit !== undefined) {
    if (items.length >= limit) items.pop();
  }

  localStorage.setItem(storageKey, JSON.stringify(items));
}

export function featureToGeoJson(feature) {
  return new GeoJSON({
    dataProjection: "EPSG:3857",
    featureProjection: "EPSG:3857",
  }).writeFeature(feature, {
    dataProjection: "EPSG:3857",
    featureProjection: "EPSG:3857",
  });
}

export function transformFrom3857to4326(coordinate) {
  return transform(coordinate, "EPSG:3857", "EPSG:4326");
}

export function getBounds(map) {
  const extent = map.getView().calculateExtent(map.getSize());
  return transformExtent(extent, "EPSG:3857", "EPSG:4326");
}

export function transformFrom4326to3857(coordinate) {
  return transform(coordinate, "EPSG:4326", "EPSG:3857");
}

export function bboxParams(map) {
  const bbox = getBounds(map);
  return {
    NW: { long: bbox[0], lat: bbox[3] },
    NE: { long: bbox[2], lat: bbox[3] },
    SW: { long: bbox[0], lat: bbox[1] },
    SE: { long: bbox[2], lat: bbox[1] },
  };
}

export function getItemsFromStorage(key) {
  const storage = localStorage.getItem(key);
  if (storage === null) return undefined;

  return JSON.parse(storage);
}
