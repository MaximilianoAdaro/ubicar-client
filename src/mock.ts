import { setupWorker } from "msw";
import { getPropertyControllerMSW } from "./api/generated/property-controller/property-controller.msw";

const worker = setupWorker(...getPropertyControllerMSW());

worker.start();
