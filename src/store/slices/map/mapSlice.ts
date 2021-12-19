// Define a type for the slice state
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface MapView {
  longitude: number;
  latitude: number;
}

interface MapState {
  view: MapView;
  zoom: number;
}

// Define the initial state using that type
const initialState: MapState = {
  view: { longitude: -6506056.858887733, latitude: -4114291.375798843 },
  zoom: 9,
};

export const mapSlice = createSlice({
  name: "map",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<MapView>) => {
      state.view = action.payload;
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
  },
});

export const createMapReducer = {
  map: mapSlice.reducer,
};

export const createMapActions = {
  map: mapSlice.actions,
};

// Other code such as selectors can use the imported `RootState` type
export const selectView = (state: RootState) => state.map.view;
export const selectZoom = (state: RootState) => state.map.zoom;
