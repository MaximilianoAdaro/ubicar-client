import { counterActions } from "./counter/counterSlice";
import { createPropertyFormActions } from "./createPropetyForm/createPropertyFormSlice";
import { sessionActions } from "./session";

export const actions = {
  ...counterActions,
  ...createPropertyFormActions,
  ...sessionActions,
};
