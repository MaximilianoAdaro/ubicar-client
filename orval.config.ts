const faker = require("faker");

module.exports = {
  ubicar: {
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
    },
  },
};

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
