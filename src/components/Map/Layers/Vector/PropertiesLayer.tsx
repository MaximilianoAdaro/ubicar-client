import React from "react";
import { PropertyProps } from "./vector-types";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import { MapContext } from "../../map";
import { IMapContext, PropertyState } from "../../maptypes";
import { Vector } from "ol/source";
import Feature from "ol/Feature";
import { convertCoordinates, getBounds } from "../../utils";
import { bbox } from "ol/loadingstrategy";
import GeoJSON from "ol/format/GeoJSON";
import CircleStyle from "ol/style/Circle";

class PropertiesLayer extends React.PureComponent<PropertyProps> {
  layer: VectorLayer;
  source: VectorSource;
  state: PropertyState = {
    visible: false,
  };

  constructor(props: PropertyProps) {
    super(props);
  }

  componentDidMount() {
    let format = new GeoJSON();
    let features = [new Feature()];

    this.source = new Vector({
      format: format,
      loader: (extent) => {
        const bbox = getBounds(this.props.map);
        let url =
          "http://localhost:3000/public/property/viewBox?b1=" +
          bbox[0] +
          "&b2=" +
          bbox[1] +
          "&b3=" +
          bbox[2] +
          "&b4=" +
          bbox[3];
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.onerror = () => {
          this.source.removeLoadedExtent(extent);
          //This threw an error
        };
        xhr.onload = () => {
          if (xhr.status === 200) {
            if (xhr.responseText.length > 3) {
              const jsonArray = JSON.parse(xhr.responseText);

              let arrayMap = jsonArray.map((data: any, index: number) => {
                const match = [
                  ...jsonArray[index].matchAll(/"id": "([-a-z0-9]+)",/g),
                ];

                const id = match[0][1];

                const parsedJson = JSON.parse(data);
                parsedJson.properties.id = id;
                return parsedJson;
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
                .map((feature: any, index) => {
                  feature.values_.fna = {
                    address:
                      feature.values_.street + " " + feature.values_.number,
                    id: feature.values_.id,
                  };
                  return feature;
                });

              this.source.addFeatures(fet);
            }
          }
        };
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(this.props.body);
      },
      strategy: bbox,
      features: features,
    });

    const style = new Style({
      image: new CircleStyle({
        radius: 8,
        fill: new Fill({ color: "black" }),
        stroke: new Stroke({
          color: "white",
          width: 2,
        }),
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
    if (prevProps.body !== this.props.body) {
      this.layer
        .getSource()
        .getFeatures()
        .forEach((feature) => {
          this.layer.getSource().removeFeature(feature); //remove all the features
        });
      this.layer.getSource().refresh(); //call the loader fn again.
    }
  }

  render() {
    return null;
  }
}

export const PropertiesLayerWithContext = (props: { body: string }) => {
  return (
    <MapContext.Consumer>
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          return <PropertiesLayer map={mapContext.map} body={props.body} />;
        }
      }}
    </MapContext.Consumer>
  );
};
