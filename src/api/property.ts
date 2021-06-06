import { useMutation, useQuery } from "react-query";
import { CreatePropertyDTO, PropertyControllerApi } from "../generated/api";

const propertyControllerApi = new PropertyControllerApi(undefined, "");

export const useFetchProperties = () => {
  return useQuery("propertyPreview", async () => {
    const { data } = await propertyControllerApi.getPropertiesUsingGET(0);
    return data;
  });
};

export const useCreateProperty = () => {
  return useMutation((data: CreatePropertyDTO) =>
    propertyControllerApi.createPropertyUsingPOST(data)
  );
};
