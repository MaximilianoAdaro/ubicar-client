const faker = require("faker");

module.exports = {
  ubicar: {
    output: {
      mode: "tags-split",
      target: "src/api/generated/endpoints.ts",
      client: "react-query",
      mock: true,
      override: {
        operationName: (operation, route, verb) => operation.summary,
        mutator: {
          path: "./src/api/mutator/custom-instance.ts",
          name: "customInstance",
        },
        query: {
          useQuery: true,
        },
        operations: {
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
              },
            },
          },
          getPropertiesUsingGET: {
            mock: {
              properties: () => ({
                "content.[].id": () => faker.datatype.uuid(),
              }),
            },
            query: {
              useInfinite: true,
              useInfiniteQueryParam: "page",
            },
          },
        },
      },
    },
    input: {
      target: "http://localhost:8080/v2/api-docs",
    },
  },
};
