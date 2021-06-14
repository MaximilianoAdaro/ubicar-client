import { useMutation } from "react-query";
import { CreatePropertyDTO, PropertyDTO } from "./generated/endpoints.schemas";
import { createPropertyUsingPOST } from "./generated/property-controller/property-controller";

export const useCreateProperty = () => {
  return useMutation(
    async (data: CreatePropertyDTO) =>
      (await createPropertyUsingPOST(data)) as PropertyDTO
  );
};
