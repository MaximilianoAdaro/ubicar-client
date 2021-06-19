import { render, screen } from "@testing-library/react";
import App from "./App";
import { setUpEnvironment } from "../test/utils";

test("renders work in progress", () => {
  render(setUpEnvironment(<App />));
  const linkElement = screen.getByText(/App in progress/i);
  expect(linkElement).toBeInTheDocument();
});
