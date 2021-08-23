import { counterReducer } from "./counter/counterSlice";
// import { createPropertyFormReducer } from "./createPropetyForm/createPropertyFormSlice";
import { createMapReducer } from "./map/mapSlice";
import { sessionReducer } from "./session";
import { editPropertyFormReducer } from "./editCreatePropertyForm/editCreatePropertyFormSlice";

export const reducer = {
  ...counterReducer,
  // ...createPropertyFormReducer,
  ...sessionReducer,
  ...createMapReducer,
  ...editPropertyFormReducer,
};
