import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface optionType {
  id: string;
  name: string;
  centroid: {
    lat: number;
    long: number;
  };
  stateName: string;
}
// Define a type for the slice state
interface SessionState {
  redirectPath: string;
  searchBar: string;
  option: optionType;
}

// Define the initial state using that type
const initialState: SessionState = {
  redirectPath: "",
  searchBar: "",
  option: {
    id: "",
    name: "",
    centroid: {
      lat: 0,
      long: 0,
    },
    stateName: "",
  },
};

export const counterSlice = createSlice({
  name: "session",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setRedirectPath: (state, action: PayloadAction<string>) => {
      state.redirectPath = action.payload;
    },
    setSearchBar: (state, action: PayloadAction<string>) => {
      state.searchBar = action.payload;
    },
    setOption: (state, action: PayloadAction<optionType>) => {
      state.option = action.payload;
    },
  },
});

export const sessionActions = {
  session: counterSlice.actions,
};

// Other code such as selectors can use the imported `RootState` type

export const selectRedirectPath = (state: RootState) =>
  state.session.redirectPath;

export const selectSearchBar = (state: RootState) => state.session.searchBar;
export const selectOption = (state: RootState) => state.session.option;

export const selectSession = (state: RootState) => state.session;

export const sessionReducer = {
  session: counterSlice.reducer,
};
