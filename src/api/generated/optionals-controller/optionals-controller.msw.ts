/*
 * Generated by orval v5.4.7 🍺
 * Do not edit manually.
 * Api Documentation
 * Api Documentation
 * OpenAPI spec version: 1.0
 */
import { rest } from "msw";

export const getOptionalsControllerMSW = () => [
  rest.get("*/amenities", (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/materials", (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/securities", (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/styles", (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/types", (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
];
