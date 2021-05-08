import { BrowserRouter } from "react-router-dom";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { store } from "../store";

export const setUpEnvironment = (component: ReactElement): ReactElement => (
  <Provider store={store}>
    <BrowserRouter>{component}</BrowserRouter>
  </Provider>
);
