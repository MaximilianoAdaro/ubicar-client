import { counterActions } from "./counter/counterSlice";
import { createPropertyFormActions } from "./createPropetyForm/createPropertyFormSlice";
import {createMapActions} from "./map/mapSlice";

export const actions = {
  ...counterActions,
  ...createPropertyFormActions,
  ...createMapActions,
};
