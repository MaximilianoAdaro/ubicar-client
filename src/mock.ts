import { setupWorker } from "msw";
import { getApiDocumentationMSW } from "./api/generated/endpoints.msw";

const worker = setupWorker(...getApiDocumentationMSW());

worker.start({
  onUnhandledRequest: "bypass",
});
