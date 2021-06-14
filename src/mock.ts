import { setupWorker, defaultContext, restContext } from "msw";
import { getPropertyControllerMSW } from "./api/generated/property-controller/property-controller.msw";

const worker = setupWorker(...getPropertyControllerMSW());

defaultContext.delay(200);
restContext.delay(200);

worker.start({
  onUnhandledRequest: "bypass",
});
