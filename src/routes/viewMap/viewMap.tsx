import React from "react";
import {MapComponent} from "../../components/Map/map"
import {selectView, selectZoom} from "../../store/slices/map/mapSlice";
import {useAppSelector} from "../../store";


export const ViewMap = () => {
    const zoom = useAppSelector(selectZoom)
    const view = useAppSelector(selectView)

    console.log(view,zoom)
    return (
            <MapComponent zoom={zoom} view={view}>
            </MapComponent>
    );
};
