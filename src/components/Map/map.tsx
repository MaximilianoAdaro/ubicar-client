import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import {TMapProps, IMapContext, TMapState} from "./maptypes";
import "ol/ol.css";
import "./map.css"
import {OSM} from "ol/source";
// @ts-ignore
import sync from 'ol-hashed';
import {PopUpLayerWithContext} from "./Layers/Vector/PopUpLayer";
import {AirportLayerWithContext} from "./Layers/Vector/AirportLayer";
import {PuertosLayerWithContext} from "./Layers/Vector/PuertosLayer";


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
                    source: new OSM()
                }),
            ],
            view: new View({
                center: [0, 0],
                zoom: 2,
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
                            <PopUpLayerWithContext/>
                            <AirportLayerWithContext/>
                            <PuertosLayerWithContext/>
                        </MapContext.Provider>
                    </div>
                )}
            </div>


        );
    }
}