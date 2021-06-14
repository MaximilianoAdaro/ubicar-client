/*
 * Generated by orval v5.4.7 🍺
 * Do not edit manually.
 * Api Documentation
 * Api Documentation
 * OpenAPI spec version: 1.0
 */
import { rest } from "msw";
import faker from "faker";

export const getErrorUsingGETMock = () =>
  faker.helpers.randomize([{}, undefined]);

export const getErrorUsingHEADMock = () =>
  faker.helpers.randomize([{}, undefined]);

export const getErrorUsingPOSTMock = () =>
  faker.helpers.randomize([{}, undefined]);

export const getErrorUsingPUTMock = () =>
  faker.helpers.randomize([{}, undefined]);

export const getErrorUsingDELETEMock = () =>
  faker.helpers.randomize([{}, undefined]);

export const getErrorUsingPATCHMock = () =>
  faker.helpers.randomize([{}, undefined]);

export const getBasicErrorControllerMSW = () => [
  rest.get("*/error", (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, "Mocked status"),
      ctx.json(getErrorUsingGETMock())
    );
  }),
  rest.head("*/error", (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, "Mocked status"),
      ctx.json(getErrorUsingHEADMock())
    );
  }),
  rest.post("*/error", (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, "Mocked status"),
      ctx.json(getErrorUsingPOSTMock())
    );
  }),
  rest.put("*/error", (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, "Mocked status"),
      ctx.json(getErrorUsingPUTMock())
    );
  }),
  rest.delete("*/error", (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, "Mocked status"),
      ctx.json(getErrorUsingDELETEMock())
    );
  }),
  rest.patch("*/error", (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, "Mocked status"),
      ctx.json(getErrorUsingPATCHMock())
    );
  }),
];
