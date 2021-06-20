import { setupWorker } from "msw";
import { getAuthControllerMSW } from "./api/generated/auth-controller/auth-controller.msw";
import { getPropertyControllerMSW } from "./api/generated/property-controller/property-controller.msw";

const worker = setupWorker(
  ...getPropertyControllerMSW()
  // ...getAuthControllerMSW()
);

worker.start({
  onUnhandledRequest: "bypass",
});
