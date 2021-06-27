import React from "react";
import { TVectorLayerComponentProps } from "./vector-types";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";
import { MapContext } from "../../map";
import { IMapContext, PropertyState } from "../../maptypes";
import { GeoJSON } from "ol/format";
import { Vector } from "ol/source";
import Feature from "ol/Feature";
import { PropertyPreviewDTO } from "../../../../api";
import { Point } from "ol/geom";
import { convertCoordinates } from "../../utils";

class PropertiesLayer extends React.PureComponent<TVectorLayerComponentProps> {
  layer: VectorLayer;
  source: VectorSource;
  state: PropertyState = {
    visible: false,
    properties: [],
  };

  componentDidMount() {
    let format = new GeoJSON();
    let features = [new Feature()];
    if (this.props.properties !== null && this.props.properties) {
      features = this.props.properties.map((data) => {
        return new Feature({
          fna: data.address.street + " " + data.address.number.toString(),
          geometry: new Point(
            convertCoordinates(
              data.address.coordinates.long,
              data.address.coordinates.lat
            )
          ),
        });
      });
    }
    this.source = new Vector({
      format: format,
      features: features,
    });

    const style = new Style({
      image: new Icon({
        src: "./icons/house.png",
        scale: 200 / 1024,
        anchor: [1, 1],
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
    if (prevProps.properties !== this.props.properties) {
      if (this.props.properties) {
        this.source.clear();
        let feat = this.props.properties.map((data) => {
          return new Feature({
            fna: data.address.street + " " + data.address.number.toString(),
            geometry: new Point(
              convertCoordinates(
                data.address.coordinates.long,
                data.address.coordinates.lat
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
  properties: PropertyPreviewDTO[];
}) => {
  return (
    <MapContext.Consumer>
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          return (
            <PropertiesLayer
              properties={props.properties}
              map={mapContext.map}
            />
          );
        }
      }}
    </MapContext.Consumer>
  );
};
