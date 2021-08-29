import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface SessionState {
  redirectPath: string;
  searchBar: string;
}

// Define the initial state using that type
const initialState: SessionState = {
  redirectPath: "",
  searchBar: "",
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
  },
});

export const sessionActions = {
  session: counterSlice.actions,
};

// Other code such as selectors can use the imported `RootState` type

export const selectRedirectPath = (state: RootState) =>
  state.session.redirectPath;

export const selectSearchBar = (state: RootState) => state.session.searchBar;

export const selectSession = (state: RootState) => state.session;

export const sessionReducer = {
  session: counterSlice.reducer,
};
