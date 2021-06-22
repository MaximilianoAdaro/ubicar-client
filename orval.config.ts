const faker = require("faker");

const config = () => ({
  "ubicar-api": {
    output: {
      mode: "split",
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
          ...getPropertyUsingGET(),
        },
      },
    },
    input: {
      target: "http://localhost:8080/v2/api-docs",
      override: {
        transformer: "./orvalConfigs/fix-res.js",
      },
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

function getPropertyUsingGET() {
  return {
    getPropertyUsingGET: {
      mock: {
        properties: {
          comments: () => faker.lorem.sentences(5),
          parkDescription: () => faker.lorem.sentences(3),
        },
      },
    },
  };
}

module.exports = config();
