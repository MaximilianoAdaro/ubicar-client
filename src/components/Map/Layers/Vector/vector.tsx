import React from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {MapContext} from "../../map";
import {IMapContext} from "../../maptypes";
import {TVectorLayerProps, TVectorLayerComponentProps} from "./vector-types";

class VectorLayerComponent extends React.PureComponent<TVectorLayerComponentProps> {
    layer: VectorLayer | undefined
    source: VectorSource | undefined

    componentDidMount() {
        this.source = new VectorSource({
            features: undefined, //TODO pass props features.
        });

        this.layer = new VectorLayer({
            source: this.source,
        });

        this.props.map.addLayer(this.layer);
    }



    render() {
        return null;
    }
}

export const VectorLayerWithContext = (props: TVectorLayerProps) => {
    return (
        <MapContext.Consumer>
            {(mapContext: IMapContext | void) => {
                if (mapContext) {
                    console.log("mapContext: ",mapContext);
                    return <VectorLayerComponent {...props} map={mapContext.map}/>;
                }
            }}
        </MapContext.Consumer>
    );
};