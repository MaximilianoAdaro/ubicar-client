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
import { Icon, Style } from "ol/style";
import { MapBrowserEvent } from "ol";
import { getBounds } from "./utils";

export const MapContext = React.createContext<IMapContext | void>(undefined);

export class MapComponent extends React.Component<TMapProps, TMapState> {
  mapDivRef: React.RefObject<HTMLDivElement>;
  check1BoxRef: React.RefObject<HTMLInputElement>;
  check2BoxRef: React.RefObject<HTMLInputElement>;
  state: TMapState = {
    view: { longitude: -6506056.858887733, latitude: -4114291.375798843 },
    zoom: 20,
    markerLayer: null,
    properties: null,
  };
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
  }
  componentDidMount() {
    if (!this.mapDivRef.current) {
      return;
    }

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

    this.map.on(["moveend", "dblclick"], () => {
      let newZoom = this.map.getView().getZoom();
      let currZoom = this.state.zoom;
      const bbox = getBounds(this.map);
      if (newZoom) {
        if (currZoom !== newZoom) {
          this.setState({ zoom: newZoom });
          this.props.setZoom(newZoom);
          this.props.setBbox(bbox);
        }
      }
    });

    this.map.on(["moveend", "dblclick"], () => {
      let newView = this.map.getView().getCenter();
      let currView = this.state.view;
      const bbox = getBounds(this.map);
      if (newView) {
        if (
          newView[0] !== currView.longitude ||
          newView[1] !== currView.latitude
        ) {
          this.setState({
            view: { longitude: newView[0], latitude: newView[1] },
          });
          this.props.setView({ longitude: newView[0], latitude: newView[1] });
          this.props.setBbox(bbox);
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
    if (prevProps.editable !== this.props.editable) {
      if (this.props.editable) {
        if (this.state.markerLayer) {
          this.map.removeLayer(this.state.markerLayer);
        }
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
          style: new Style({
            image: new Icon({
              src: "./icons/house.png",
              scale: 200 / 1024,
              anchor: [0.5, 0.75],
            }),
          }),
        });
        this.setState({ markerLayer: markerLayer });
        this.map.addLayer(markerLayer);

        const onMapClick = (event: MapBrowserEvent) => {
          const featureToAdd = new Feature({
            geometry: new Point(event.coordinate),
            fna: "Tu casa!",
          });

          markerLayer.getSource().clear();
          markerLayer.getSource().addFeatures([featureToAdd]);
          // @ts-ignore
          this.props.handleChangeClick(
            event.coordinate[1],
            event.coordinate[0]
          );
        };
        this.map.on("singleclick", onMapClick);
      }
    }

    if (prevProps.view !== this.props.view) {
      this.map.setView(
        new View({
          projection: "EPSG:3857",
          center: [this.props.view.longitude, this.props.view.latitude],
          zoom: this.props.zoom,
        })
      );
    }
    if (prevProps.zoom !== this.props.zoom) {
      this.map.setView(
        new View({
          projection: "EPSG:3857",
          center: [this.props.view.longitude, this.props.view.latitude],
          zoom: this.props.zoom,
        })
      );
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
                <PropertiesLayerWithContext editable={this.props.editable} />
                <IndustrialAreaLayers />
              </>
            )}
          </MapContext.Provider>
        )}
      </div>
    );
  }
}
