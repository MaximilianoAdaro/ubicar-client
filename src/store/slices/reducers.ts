import { counterReducer } from "./counter/counterSlice";
import { createPropertyFormReducer } from "./createPropetyForm/createPropertyFormSlice";
import { createMapReducer } from "./map/mapSlice";
import { sessionReducer } from "./session";
import { editPropertyFormReducer } from "./editPropertyForm/editPropertyFormSlice";

export const reducer = {
  ...counterReducer,
  ...createPropertyFormReducer,
  ...sessionReducer,
  ...createMapReducer,
  ...editPropertyFormReducer,
};
