import React from "react";
import { TVectorLayerComponentProps, TVectorLayerProps } from "./vector-types";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Icon, Stroke, Style, Text } from "ol/style";
import { MapContext } from "../../map";
import { IMapContext } from "../../maptypes";
import { GeoJSON } from "ol/format";
import { bboxParams } from "../../utils";

class UniversitiesLayer extends React.PureComponent<TVectorLayerComponentProps> {
  layer: VectorLayer;
  source: VectorSource;
  state = { visible: false };

  componentDidMount() {
    const bbox = bboxParams(this.props.map);

    debugger;
    this.source = new VectorSource({
      url: "./geojson/Universidad.geojson",
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
      image: new Icon({
        src: "./icons/university.png",
        scale: 50 / 1024,
        anchor: [0.5, 0.75],
      }),
      text: new Text(),
    });

    this.layer = new VectorLayer({
      source: this.source,
      visible: this.state.visible,
      style: function () {
        return [style];
      },
    });

    this.layer.set("title", "Universidades");
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

export const UniversidadesLayerWithContext = (props: TVectorLayerProps) => {
  return (
    <MapContext.Consumer>
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          return <UniversitiesLayer {...props} map={mapContext.map} />;
        }
      }}
    </MapContext.Consumer>
  );
};
