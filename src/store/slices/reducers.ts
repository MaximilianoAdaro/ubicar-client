import { counterReducer } from "./counter/counterSlice";
import { createPropertyFormReducer } from "./createPropetyForm/createPropertyFormSlice";

export const reducer = {
  ...counterReducer,
  ...createPropertyFormReducer,
};
