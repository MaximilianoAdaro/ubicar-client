import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { TMapProps, IMapContext, TMapState } from "./maptypes";
import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
import "./map.css";
import styles from "./map.module.scss";
import {
  AirportLayer,
  FireLayer,
  NationalRoutesLayer,
  PopUpLayer,
  PortLayer,
  UniversityLayer,
  SchoolLayer,
  RailwayLayer,
  HospitalLayer,
  PoliceLayer,
  PrisonLayer,
  IndustrialAreaLayers,
} from "./Layers/Vector";
import { XYZ } from "ol/source";
import { MapView } from "../../store/slices/map/mapSlice";
import LayerSwitcher from "ol-layerswitcher";
import { PropertiesLayerWithContext } from "./Layers/Vector/PropertiesLayer";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import { PropertyPreviewDTO } from "../../api";
import { Icon, Style } from "ol/style";

export const MapContext = React.createContext<IMapContext | void>(undefined);

export class MapComponent extends React.PureComponent<TMapProps, TMapState> {
  mapDivRef: React.RefObject<HTMLDivElement>;
  check1BoxRef: React.RefObject<HTMLInputElement>;
  check2BoxRef: React.RefObject<HTMLInputElement>;
  state: TMapState = {
    view: { longitude: -6506056.858887733, latitude: -4114291.375798843 },
    zoom: 10,
    editable: false,
    markerLayer: null,
    properties: null,
  };
  properties: PropertyPreviewDTO[] | null | undefined;
  zoom: number;
  view: MapView;
  renderLayers: boolean | null | undefined;
  additionalStyle: React.CSSProperties | null | undefined;
  additionalLayers: TileLayer | null | undefined;
  map: Map;

  constructor(props: TMapProps) {
    super(props);
    this.mapDivRef = React.createRef<HTMLDivElement>();
    this.check1BoxRef = React.createRef<HTMLInputElement>();
    this.check2BoxRef = React.createRef<HTMLInputElement>();
    this.zoom = props.zoom;
    this.view = props.view;
    this.renderLayers = props.renderLayers;
    this.additionalStyle = props.additionalStyle;
    this.additionalLayers = props.additionalLayers;
    this.properties = props.properties;
  }
  componentDidMount() {
    if (!this.mapDivRef.current) {
      return;
    }

    this.setState({ properties: this.properties });

    const layers = [
      new TileLayer({
        source: new XYZ({
          attributions: "© OpenStreetMap",
          url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        }),
      }),
    ];

    if (this.additionalLayers !== undefined && this.additionalLayers !== null) {
      layers.push(this.additionalLayers);
    }

    this.map = new Map({
      target: this.mapDivRef.current,
      layers: layers,
      view: new View({
        projection: "EPSG:3857",
        center: [this.view.longitude, this.view.latitude],
        zoom: this.zoom,
      }),
    });

    let currZoom = this.map.getView().getZoom();
    this.map.on("moveend", () => {
      let newZoom = this.map.getView().getZoom();
      if (currZoom !== newZoom) {
        if (newZoom) {
          this.state.zoom = newZoom;
        }
      }
    });

    this.map.on("pointermove", (e) => {
      if (e.dragging) {
        return;
      }
      const pixel = this.map.getEventPixel(e.originalEvent);
      const hit = this.map.hasFeatureAtPixel(pixel);
      this.map.getTargetElement().style.cursor = hit ? "pointer" : "";
    });

    const mapContext: IMapContext = { map: this.map };
    this.setState({
      mapContext: mapContext,
    });

    const layerSwitcher = new LayerSwitcher({
      startActive: false,
      label: "",
      tipLabel: "",
      collapseTipLabel: "Collapse legend",
      groupSelectStyle: "children",
      reverse: false,
    });

    if (this.renderLayers) {
      this.map.addControl(layerSwitcher);
    }
  }

  componentDidUpdate(
    prevProps: Readonly<TMapProps>,
    prevState: Readonly<TMapState>,
    snapshot?: any
  ) {
    if (prevProps.view !== this.props.view) {
      if (this.state.markerLayer !== null) {
        this.map.removeLayer(this.state.markerLayer);
      }
      this.map.setView(
        new View({
          projection: "EPSG:3857",
          center: [this.props.view.longitude, this.props.view.latitude],
          zoom: this.props.zoom,
        })
      );
      this.setState({ view: this.props.view });
      const style = new Style({
        image: new Icon({
          src: "./icons/house.png",
          scale: 200 / 1024,
          anchor: [0.5, 0.75],
        }),
      });
      const markerLayer = new VectorLayer({
        source: new VectorSource({
          features: [
            new Feature({
              geometry: new Point([
                this.props.view.longitude,
                this.props.view.latitude,
              ]),
              fna: "Tu casa!",
            }),
          ],
        }),
        style: style,
      });
      this.setState({ markerLayer: markerLayer });
      this.map.addLayer(markerLayer);
      // const onMapClick = (event: MapBrowserEvent) => {
      //   const featureToAdd = new Feature({
      //     geometry: new Point(event.coordinate),
      //     fna: "Tu casa!",
      //   });
      //
      //   Markerlayer.getSource().clear();
      //   Markerlayer.getSource().addFeatures([featureToAdd]);
      // };
      // this.map.on("singleclick", onMapClick);
    }
    if (prevProps.zoom !== this.props.zoom) {
      this.setState({ zoom: this.props.zoom });
      this.map.setView(
        new View({
          projection: "EPSG:3857",
          center: [this.props.view.longitude, this.props.view.latitude],
          zoom: this.props.zoom,
        })
      );
    }

    if (prevProps.properties !== this.props.properties) {
      this.setState({ properties: this.props.properties });
    }
  }

  render() {
    return (
      <div
        className={styles.map}
        style={this.additionalStyle !== null ? this.additionalStyle : undefined}
        ref={this.mapDivRef}
      >
        {this.state.mapContext && (
          <MapContext.Provider value={this.state.mapContext}>
            <PopUpLayer />
            {this.props.renderLayers && (
              <>
                <UniversityLayer />
                <NationalRoutesLayer />
                <AirportLayer />
                <PortLayer />
                <FireLayer />
                <SchoolLayer />
                <RailwayLayer />
                <HospitalLayer />
                <PoliceLayer />
                <PrisonLayer />
                {this.state.properties && (
                  <PropertiesLayerWithContext
                    properties={this.state.properties}
                  />
                )}
                <IndustrialAreaLayers />
              </>
            )}
          </MapContext.Provider>
        )}
      </div>
    );
  }
}
