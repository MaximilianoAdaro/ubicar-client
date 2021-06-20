import React from "react";
import { TVectorLayerComponentProps, TVectorLayerProps } from "./vector-types";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Icon, Stroke, Style } from "ol/style";
import { MapContext } from "../../map";
import { IMapContext } from "../../maptypes";
import { GeoJSON } from "ol/format";
import { Vector } from "ol/source";
import { bbox } from "ol/loadingstrategy";

class PropertiesLayer extends React.PureComponent<TVectorLayerComponentProps> {
  layer: VectorLayer;
  source: VectorSource;
  state = { visible: false };

  componentDidMount() {
    let format = new GeoJSON();
    this.source = new Vector({
      format: format,
      loader: (extent, resolution, projection) => {
        let proj = projection.getCode();
        let url =
          "https://ahocevar.com/geoserver/wfs?service=WFS&" +
          "version=1.1.0&request=GetFeature&typename=osm:water_areas&" +
          "outputFormat=application/json&srsname=" +
          proj +
          "&" +
          "bbox=" +
          extent.join(",") +
          "," +
          proj;

        //TODO: Add our own geoserver

        //Request
        //https://ahocevar.com/geoserver/wfs?service=WFS&version=1.1.0
        // &request=GetFeature&typename=osm:water_areas&outputFormat=application/json
        // &srsname=EPSG:3857 //Projection
        // &bbox=-6559480.143746955,-4175939.094088902,-6459653.384806516,-4053639.84883262, //Our view
        // EPSG:3857

        //Response if none found
        //{"type":"FeatureCollection","features":[],
        // "totalFeatures":0,"numberMatched":0,"numberReturned":0,
        // "timeStamp":"2021-06-06T14:26:22.555Z","crs":null}

        //Response if found
        //{"type":"FeatureCollection","features":[{"type":"Feature",
        // "id":"water_areas.33",
        // "geometry":{"type":"MultiPolygon",
        // "coordinates":[[[[-7531024.79,5958753.67],[-7531020.87,5958772.75],[-7531007.04,5958806.53],[-7530990.77,5958807.08],[-7530935.06,5958757.37],[-7530926.68,5958740.67],[-7530928.45,5958715.78],[-7530933.52,5958711.69],[-7530941.36,5958712.08],[-7530963.83,5958722.42],[-7530989.96,5958724.81],[-7531024.79,5958753.67]]]]},
        // "geometry_name":"the_geom",
        // "properties":{"osm_id":66763844,"natural":"natural","waterway":null,"landuse":"reservoir","name":null}}]},

        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        let onError = () => {
          this.source.removeLoadedExtent(extent);
        };
        xhr.onerror = onError;
        xhr.onload = () => {
          if (xhr.status == 200) {
            let newFeature = format.readFeatures(xhr.responseText);
            this.source.addFeatures(newFeature);
          } else {
            onError();
          }
        };
        xhr.send();
      },
      strategy: bbox,
    });
    const style = new Style({
      image: new Icon({
        src: "./icons/house.png",
        scale: 50 / 1024,
        anchor: [1, 1],
      }),
      fill: new Fill({
        color: "rgba(30, 400, 240, 0.3)",
      }),
      stroke: new Stroke({
        width: 3,
        color: "rgba(0, 100, 240, 0.8)",
      }),
    });

    this.layer = new VectorLayer({
      source: this.source,
      visible: true,
      style: function () {
        return [style];
      },
    });
    this.props.map.addLayer(this.layer);
  }

  componentWillUnmount() {
    this.props.map.removeLayer(this.layer);
  }

  componentDidUpdate(prevProps: TVectorLayerComponentProps) {
    if (prevProps.features !== this.props.features) {
      this.source.clear();
      if (this.props.features) {
        this.source.addFeatures(this.props.features);
      }
    }
  }

  render() {
    return null;
  }
}

export const PropertiesLayerWithContext = (props: TVectorLayerProps) => {
  return (
    <MapContext.Consumer>
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          return <PropertiesLayer {...props} map={mapContext.map} />;
        }
      }}
    </MapContext.Consumer>
  );
};
