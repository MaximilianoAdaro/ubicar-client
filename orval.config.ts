const faker = require("faker");
// const orval = require("orval");

// type FirstParameter<T extends (...args: any) => any> = T extends (
//   config: infer P,
//   args: any
// ) => any
//   ? P
//   : never;
//
// type FirstArg = FirstParameter<typeof orval.generate>;
// type GetOptions<T> = T extends string | undefined | infer P ? P : {};
// type Options = GetOptions<FirstArg>;
// declare type Config = {
//   [backend: string]: Options;
// };

const config = () /*: Config*/ => ({
  "ubicar-api": {
    output: {
      mode: "tags-split",
      target: "src/api/generated/endpoints.ts",
      client: "react-query",
      mock: true,
      override: {
        mutator: {
          path: "./src/api/mutator/custom-instance.ts",
          name: "customInstance",
        },
        mock: {
          required: true,
          properties: {
            "/.*id$/": () => faker.datatype.uuid(),
            "/email/": () => faker.internet.email(),
          },
        },
        operations: {
          ...getLoggedUsingGET(),
          ...getPropertiesUsingGET(),
        },
      },
    },
    input: {
      target: "http://localhost:8080/v2/api-docs",
      // override: {
      //   transformer: (spec) => {
      //     return {
      //       ...spec,
      //       paths: Object.entries(spec.paths).reduce(
      //         (acc, [path, pathItem]) => ({
      //           ...acc,
      //           [path]: Object.entries(pathItem).reduce(
      //             (pathItemAcc, [verb, operation]) => ({
      //               ...pathItemAcc,
      //               [verb]: {
      //                 ...operation,
      //               },
      //             }),
      //             {}
      //           ),
      //         }),
      //         {}
      //       ),
      //     };
      //   },
      // },
    },
  },
});

function getLoggedUsingGET() {
  return {
    getLoggedUsingGET: {
      query: {
        options: {
          retry: false,
          refetchInterval: false,
          refetchOnMount: false,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          retryOnMount: false,
          refetchIntervalInBackground: false,
          staleTime: Infinity,
        },
      },
    },
  };
}

function getPropertiesUsingGET() {
  return {
    getPropertiesUsingGET: {
      query: {
        useQuery: true,
        useInfinite: true,
        useInfiniteQueryParam: "page",
      },
    },
  };
}

module.exports = config();
