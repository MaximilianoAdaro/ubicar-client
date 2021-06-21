import { setupWorker } from "msw";
import { getAuthControllerMSW } from "./api/generated/auth-controller/auth-controller.msw";
import { getLocationControllerMSW } from "./api/generated/location-controller/location-controller.msw";
import { getPropertyControllerMSW } from "./api/generated/property-controller/property-controller.msw";
import { getPropertyPublicControllerMSW } from "./api/generated/property-public-controller/property-public-controller.msw";

const worker = setupWorker(
  ...getPropertyControllerMSW(),
  ...getPropertyPublicControllerMSW()
  // ...getAuthControllerMSW()
);

worker.start({
  onUnhandledRequest: "bypass",
});
