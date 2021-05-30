import { counterReducer } from "./counter/counterSlice";
import { createPropertyFormReducer } from "./createPropetyForm/createPropertyFormSlice";
import {createMapReducer} from "./map/mapSlice";

export const reducer = {
  ...counterReducer,
  ...createPropertyFormReducer,
  ...createMapReducer
};
