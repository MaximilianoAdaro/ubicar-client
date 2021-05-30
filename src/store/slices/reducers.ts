import { counterReducer } from "./counter/counterSlice";
import { createPropertyFormReducer } from "./createPropetyForm/createPropertyFormSlice";
import { sessionReducer } from "./session";

export const reducer = {
  ...counterReducer,
  ...createPropertyFormReducer,
  ...sessionReducer,
};
