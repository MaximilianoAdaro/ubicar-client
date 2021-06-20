/**
 * Transformer function for orval.
 *
 * @param {OpenAPIObject} schema
 * @return {OpenAPIObject}
 */
module.exports = (inputSchema) => {
  return {
    ...inputSchema,
    paths: Object.entries(inputSchema.paths).reduce(
      (acc, [path, pathItem]) => ({
        ...acc,
        [path]: Object.entries(pathItem).reduce(
          (pathItemAcc, [verb, operation]) => {
            const fixedResponses = Object.entries(operation.responses).reduce(
              (acc, [resNumber, resValue]) => {
                if (!resValue.content) return acc;
                // if (resNumber.startsWith(2) && !resValue.content) return acc;

                return {
                  ...acc,
                  [resNumber]: resValue,
                };
              },
              {}
            );

            return {
              ...pathItemAcc,
              [verb]: {
                ...operation,
                responses: fixedResponses,
              },
            };
          },
          {}
        ),
      }),
      {}
    ),
  };
};
