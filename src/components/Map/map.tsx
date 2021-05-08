import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import GeoJSON from "ol/format/GeoJSON";
import { TMapProps, IMapContext, TMapState } from "./maptypes";
import "ol/ol.css";
import "./map.css"
import XYZSource from 'ol/source/XYZ';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {VectorLayerWithContext} from "./Layers/Vector/vector";
export const MapContext = React.createContext<IMapContext | void>(undefined);

export class MapComponent extends React.PureComponent<TMapProps, TMapState> {
    mapDivRef: React.RefObject<HTMLDivElement>;
    state: TMapState = {};


    constructor(props: TMapProps) {
        super(props);
        this.mapDivRef = React.createRef<HTMLDivElement>();
    }

    componentDidMount() {
        if (!this.mapDivRef.current) {
            return;
        }


        const map = new Map({
            target: this.mapDivRef.current,
            layers: [
                new TileLayer({
                    source: new XYZSource({
                        url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
                    })
                }),
                new VectorLayer({ //TODO use our own vectorlayer, for popup info later. (VIA CONTEXT!)
                    source: new VectorSource({
                        format: new GeoJSON(),
                        url: './data.json'
                    })
                })
            ]
            , //TODO ADD OVERLAYS SO WE GET GEOJSON PROPERTIES
            view: new View({
                center: [-6506056.858887733,
                    -4114291.375798843],
                zoom: 10,
            }),
        });



        const mapContext: IMapContext = { map };
        this.setState({
            mapContext: mapContext,
        });

    };


    render() {
        return (
            <div className="map" ref={this.mapDivRef}>
                {this.state.mapContext && (
                    <MapContext.Provider value={this.state.mapContext}>
                        {/*<VectorLayerWithContext layer={} source={}/>*/}
                    </MapContext.Provider>
                )}
            </div>
        );
    }
}