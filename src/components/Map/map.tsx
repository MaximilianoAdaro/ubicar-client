import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { TMapProps, IMapContext, TMapState } from "./maptypes";
import "ol/ol.css";
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
import { FullScreen, defaults as defaultControls } from "ol/control";

export const MapContext = React.createContext<IMapContext | void>(undefined);

export class MapComponent extends React.PureComponent<TMapProps, TMapState> {
  mapDivRef: React.RefObject<HTMLDivElement>;
  check1BoxRef: React.RefObject<HTMLInputElement>;
  check2BoxRef: React.RefObject<HTMLInputElement>;
  state: TMapState = {};
  zoom: number;
  view: MapView;

  constructor(props: TMapProps) {
    super(props);
    this.mapDivRef = React.createRef<HTMLDivElement>();
    this.check1BoxRef = React.createRef<HTMLInputElement>();
    this.check2BoxRef = React.createRef<HTMLInputElement>();
    this.zoom = props.zoom;
    this.view = props.view;
  }
  componentDidMount() {
    if (!this.mapDivRef.current) {
      return;
    }

    const map = new Map({
      target: this.mapDivRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            attributions: "© OpenStreetMap",
            url: "https://{a-c}.tile.osm.org/{z}/{x}/{y}.png",
          }),
        }),
      ],
      controls: defaultControls().extend([
        new FullScreen({
          source: "fullscreen",
        }),
      ]),
      view: new View({
        center: [this.view.longitude, this.view.latitude],
        zoom: this.zoom,
      }),
    });

    let currZoom = map.getView().getZoom();
    map.on("moveend", function () {
      let newZoom = map.getView().getZoom();
      if (currZoom !== newZoom) {
        if (newZoom !== null) {
          //TODO UPDATE DATA
        }
      }
    });

    map.on("pointermove", (e) => {
      if (e.dragging) {
        return;
      }
      const pixel = map.getEventPixel(e.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
      map.getTargetElement().style.cursor = hit ? "pointer" : "";
    });

    const mapContext: IMapContext = { map };
    this.setState({
      mapContext: mapContext,
    });
  }

  componentDidUpdate() {}

  render() {
    return (
      <div className={styles.map} ref={this.mapDivRef}>
        {this.state.mapContext && (
          <div className={styles.formGroup}>
            <MapContext.Provider value={this.state.mapContext}>
              <PopUpLayer />
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
              <IndustrialAreaLayers />
            </MapContext.Provider>
          </div>
        )}
      </div>
    );
  }
}
