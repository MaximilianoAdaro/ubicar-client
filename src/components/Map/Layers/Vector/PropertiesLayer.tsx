import React from "react";
import { PropertyProps } from "./vector-types";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";
import { MapContext } from "../../map";
import { IMapContext, PropertyState } from "../../maptypes";
import { Vector } from "ol/source";
import Feature from "ol/Feature";
import { PropertyPreviewDTO } from "../../../../api";
import { Point } from "ol/geom";
import { convertCoordinates, getBounds } from "../../utils";
import { bbox } from "ol/loadingstrategy";
import GeoJSON from "ol/format/GeoJSON";

class PropertiesLayer extends React.PureComponent<PropertyProps> {
  layer: VectorLayer;
  source: VectorSource;
  editable: boolean;
  state: PropertyState = {
    visible: false,
    properties: [],
    propsGeom: [],
    editable: false,
  };

  constructor(props: PropertyProps) {
    super(props);
  }

  componentDidMount() {
    let format = new GeoJSON();
    let features = [new Feature()];
    if (this.props.properties !== null && this.props.properties) {
      features = this.props.properties.map((data) => {
        return new Feature({
          fna: `${data.address?.street ?? ""} ${
            data.address?.number.toString() ?? ""
          }`,
          geometry: new Point(
            convertCoordinates(
              data.address?.coordinates.long ?? 0,
              data.address?.coordinates.lat ?? 0
            )
          ),
        });
      });
    }

    this.source = new Vector({
      format: format,
      loader: (extent) => {
        const bbox = getBounds(this.props.map);
        let url =
          "http://localhost:3000/public/property/viewBox?b1=" +
          bbox[1] +
          "&b2=" +
          bbox[0] +
          "&b3=" +
          bbox[3] +
          "&b4=" +
          bbox[2];
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onerror = () => {
          this.source.removeLoadedExtent(extent);
          //This threw an error
        };
        xhr.onload = () => {
          while (xhr.status !== 200) {
            console.log("loading");
          }
          if (xhr.responseText.length > 3) {
            let arrayMap = JSON.parse(xhr.responseText).map((data: any) => {
              return JSON.parse(data);
            });
            let newArray = arrayMap.map((feature: any) => {
              feature.geometry.coordinates = convertCoordinates(
                feature.geometry.coordinates[0],
                feature.geometry.coordinates[1]
              );
              return feature;
            });

            let geojsonObject = {
              type: "FeatureCollection",
              features: newArray,
            };
            let fet = new GeoJSON()
              .readFeatures(geojsonObject)
              .map((feature: any) => {
                feature.values_.fna =
                  feature.values_.street + " " + feature.values_.number;
                return feature;
              });

            this.source.addFeatures(fet);
          }
        };
        xhr.send();
      },
      strategy: bbox,
      features: features,
    });

    const style = new Style({
      image: new Icon({
        src: "./icons/house.png",
        scale: 200 / 1024,
        anchor: [0.5, 0.75],
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

  componentDidUpdate(prevProps: PropertyProps, prevState: Readonly<any>) {
    if (prevProps.properties !== this.props.properties) {
      if (this.props.properties) {
        if (this.state.editable) {
          this.source.clear();
        }
        let feat = this.props.properties.map((data) => {
          return new Feature({
            fna: `${data.address?.street ?? ""} ${
              data.address?.number.toString() ?? ""
            }`,
            geometry: new Point(
              convertCoordinates(
                data.address?.coordinates.long ?? 0,
                data.address?.coordinates.lat ?? 0
              )
            ),
          });
        });
        this.source.addFeatures(feat);
      }
    }
  }

  render() {
    return null;
  }
}

export const PropertiesLayerWithContext = (props: {
  properties?: PropertyPreviewDTO[] | null;
  editable: boolean;
}) => {
  return (
    <MapContext.Consumer>
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          return (
            <PropertiesLayer
              properties={props.properties}
              map={mapContext.map}
              editable={props.editable}
            />
          );
        }
      }}
    </MapContext.Consumer>
  );
};
