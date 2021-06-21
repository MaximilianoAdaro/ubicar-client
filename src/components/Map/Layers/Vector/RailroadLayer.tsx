import React from "react";
import { TVectorLayerComponentProps, TVectorLayerProps } from "./vector-types";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style, Text } from "ol/style";
import { MapContext } from "../../map";
import { IMapContext } from "../../maptypes";
import { GeoJSON } from "ol/format";

class RailroadLayer extends React.PureComponent<TVectorLayerComponentProps> {
  layer: VectorLayer;
  source: VectorSource;
  state = { visible: false };

  componentDidMount() {
    this.source = new VectorSource({
      url: "./geojson/Ferrocarril.geojson",
      format: new GeoJSON(),
    });
    const style = new Style({
      fill: new Fill({
        color: "rgba(30, 400, 240, 0.3)",
      }),
      stroke: new Stroke({
        width: 3,
        color: "rgba(0, 100, 240, 0.8)",
      }),
      text: new Text(),
    });

    this.layer = new VectorLayer({
      source: this.source,
      visible: this.state.visible, //Todo set redux variable.
      style: function () {
        return [style];
      },
    });

    this.layer.set("title", "Ferrocarriles");
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

export const FerrocarrilLayerWithContext = (props: TVectorLayerProps) => {
  return (
    <MapContext.Consumer>
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          return <RailroadLayer {...props} map={mapContext.map} />;
        }
      }}
    </MapContext.Consumer>
  );
};
