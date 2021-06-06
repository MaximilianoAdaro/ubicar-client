import { counterActions } from "./counter/counterSlice";
import { createPropertyFormActions } from "./createPropetyForm/createPropertyFormSlice";
import { createMapActions } from "./map/mapSlice";
import { sessionActions } from "./session";

export const actions = {
  ...counterActions,
  ...createPropertyFormActions,
  ...createMapActions,
  ...sessionActions,
};
