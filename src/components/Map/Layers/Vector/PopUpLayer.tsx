import React from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { MapContext } from "../../map";
import { IMapContext } from "../../maptypes";
import { TVectorLayerProps, TVectorLayerComponentProps } from "./vector-types";
import { MapBrowserEvent, Overlay } from "ol";

import "./LayerStyles.scss";
import { Circle, Fill, Stroke, Style, Text } from "ol/style";

class PopUpLayer extends React.PureComponent<TVectorLayerComponentProps> {
  layer: VectorLayer;
  source: VectorSource;
  popUpRef: HTMLElement;
  popUpContentRef: HTMLElement;
  popUpCloserRef: HTMLElement;
  popup: Overlay;

  componentDidMount() {
    this.source = new VectorSource({});

    const style = new Style({
      fill: new Fill({
        color: "rgba(20, 100, 240, 0.3)",
      }),
      stroke: new Stroke({
        width: 3,
        color: "rgba(0, 100, 240, 0.8)",
      }),
      image: new Circle({
        fill: new Fill({
          color: "rgba(55, 200, 150, 0.5)",
        }),
        stroke: new Stroke({
          width: 10,
          color: "rgba(55, 200, 150, 0.8)",
        }),
        radius: 7,
      }),
      text: new Text(),
    });

    this.layer = new VectorLayer({
      source: this.source,
      style: function () {
        return [style];
      },
    });

    this.popUpContentRef = document.getElementById("ol-popup-content")!;
    this.popUpRef = document.getElementById("ol-popup")!;
    this.popUpCloserRef = document.getElementById("ol-popup-closer")!;

    this.popup = new Overlay({
      element: this.popUpRef,
    });

    this.props.map.addLayer(this.layer);
    this.props.map.on("singleclick", this.onMapClick);
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

  onMapClick = (evt: MapBrowserEvent) => {
    const feature = this.props.map.forEachFeatureAtPixel(
      evt.pixel,
      (feature) => {
        return feature;
      }
    );
    if (feature) {
      this.popUpContentRef.innerHTML = "<p>" + feature.get("fna") + "</p>";

      this.popup.setPosition(evt.coordinate);
      this.props.map.addOverlay(this.popup);
    } else {
      this.popup.setPosition(undefined);
      this.popUpContentRef.innerHTML = "";
    }
  };

  render() {
    return (
      <div
        id="ol-popup"
        style={{
          position: "absolute",
          background: "white",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          padding: "15px",
          borderRadius: "10px",
          border: "1px solid #cccccc",
          minWidth: "280px",
        }}
      >
        <a id="ol-popup-closer" />
        <div id="ol-popup-content" />
      </div>
    );
  }
}

export const PopUpLayerWithContext = (props: TVectorLayerProps) => {
  return (
    <MapContext.Consumer>
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          return <PopUpLayer {...props} map={mapContext.map} />;
        }
      }}
    </MapContext.Consumer>
  );
};
