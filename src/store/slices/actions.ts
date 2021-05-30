import { counterActions } from "./counter/counterSlice";
import { createPropertyFormActions } from "./createPropetyForm/createPropertyFormSlice";

export const actions = {
  ...counterActions,
  ...createPropertyFormActions,
};
