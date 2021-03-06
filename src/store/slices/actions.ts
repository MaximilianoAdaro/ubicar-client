import { counterActions } from "./counter/counterSlice";
// import { createPropertyFormActions } from "./createPropetyForm/createPropertyFormSlice";
import { createMapActions } from "./map/mapSlice";
import { sessionActions } from "./session";
import { editPropertyFormActions } from "./editCreatePropertyForm/editCreatePropertyFormSlice";

export const actions = {
  ...counterActions,
  // ...createPropertyFormActions,
  ...createMapActions,
  ...sessionActions,
  ...editPropertyFormActions,
};
