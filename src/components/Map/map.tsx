import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import {TMapProps, IMapContext, TMapState} from "./maptypes";
import "ol/ol.css";
import "./map.css"
import XYZSource from 'ol/source/XYZ'
import {
    AirportLayer,
    FireLayer,
    NationalRoutesLayer,
    PopUpLayer,
    PortLayer,
    UniversityLayer,
    SchoolLayer,
    RailwayLayer, HospitalLayer, PoliceLayer, PrisonLayer, IndustrialAreaLayers
} from "./Layers/Vector";
import TileSource from "ol/source/Tile";
import {XYZ} from "ol/source";


export const MapContext = React.createContext<IMapContext | void>(undefined);

export class MapComponent extends React.PureComponent<TMapProps, TMapState> {
    mapDivRef: React.RefObject<HTMLDivElement>;
    check1BoxRef: React.RefObject<HTMLInputElement>;
    check2BoxRef: React.RefObject<HTMLInputElement>;
    state: TMapState = {};


    constructor(props: TMapProps) {
        super(props);
        this.mapDivRef = React.createRef<HTMLDivElement>();
        this.check1BoxRef = React.createRef<HTMLInputElement>()
        this.check2BoxRef = React.createRef<HTMLInputElement>()
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
                        attributions:"© OpenStreetMap",
                        url: "https://{a-c}.tile.osm.org/{z}/{x}/{y}.png"
                    })
                }),


            ],
            view: new View({
                center: [-6506056.858887733,
                    -4114291.375798843],
                zoom: 10,
            }),
        });


        map.on('pointermove', (e) => {
            if (e.dragging) {
                return;
            }
            const pixel = map.getEventPixel(e.originalEvent);
            const hit = map.hasFeatureAtPixel(pixel);
            map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        });


        const mapContext: IMapContext = {map};
        this.setState({
            mapContext: mapContext,
        });


    };

    componentDidUpdate() {

    }

    render() {
        return (
            <div className="map" ref={this.mapDivRef}>
                {this.state.mapContext && (
                    <div className="form-group">
                        <MapContext.Provider value={this.state.mapContext}>
                            <PopUpLayer/>
                            <UniversityLayer/>
                            <NationalRoutesLayer/>
                            <AirportLayer/>
                            <PortLayer/>
                            <FireLayer/>
                            <SchoolLayer/>
                            <RailwayLayer/>
                            <HospitalLayer/>
                            <PoliceLayer/>
                            <PrisonLayer/>
                            <IndustrialAreaLayers/>
                        </MapContext.Provider>
                    </div>
                )}
            </div>


        );
    }
}