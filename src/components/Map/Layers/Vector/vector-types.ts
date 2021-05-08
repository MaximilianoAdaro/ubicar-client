import Map from "ol/Map";
import Feature from "ol/Feature";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

export type TVectorLayerProps = {
    layer: VectorLayer;
    source: VectorSource;
};

export type TVectorLayerComponentProps = TVectorLayerProps & {
    map: Map;
    features?: Feature[];
};