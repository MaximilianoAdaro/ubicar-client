import React from "react";
import {TVectorLayerComponentProps, TVectorLayerProps} from "./vector-types";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {Fill, Icon, Stroke, Style, Text} from "ol/style";
import {MapContext} from "../../map";
import {IMapContext} from "../../maptypes";
import {GeoJSON} from "ol/format";

class HospitalLayer extends React.PureComponent<TVectorLayerComponentProps> {
    layer: VectorLayer;
    source: VectorSource;
    state = {visible:false};

    componentDidMount() {

        this.source = new VectorSource({
            url: "./geojson/Edificio de salud.geojson",
            format: new GeoJSON(),

        });
        const style = new Style({
            fill: new Fill({
                color: 'rgba(30, 400, 240, 0.3)'
            }),
            stroke: new Stroke({
                width: 3,
                color: 'rgba(0, 100, 240, 0.8)'
            }),
            image: new Icon({
                src: "./icons/hospital.png",
                scale: 30 / 1024,
                anchor: [1, 1],
            }),
            text: new Text(
            ),
        });

        this.layer = new VectorLayer({
            source: this.source,
            style: function () {
                return [style];
            }
        });

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
        if (this.state.visible) {
            this.props.map.addLayer(this.layer);
        } else {
            this.props.map.removeLayer(this.layer)
        }
    }


    render() {
        return (
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="hospital" checked={this.state.visible}
                       onChange={() => this.setState({visible:!this.state.visible})}/>
                <label className="custom-control-label" htmlFor="hospital">Hospitales</label>
            </div>
        )

    }
}

export const HospitalLayerWithContext = (props: TVectorLayerProps) => {
    return (
        <MapContext.Consumer>
            {(mapContext: IMapContext | void) => {
                if (mapContext) {
                    return <HospitalLayer {...props}
                                         map={mapContext.map}
                    />;
                }
            }}
        </MapContext.Consumer>
    );
};