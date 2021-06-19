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

export const useGetProperty = (id: string) => {
  return useQuery("propertyPreview", async () => {
    const { data } = await propertyControllerApi.getPropertyUsingGET(id);
    return data;
  });
};

export const useEditProperty = (id: string) => {
  return useMutation((data: CreatePropertyDTO) =>
    propertyControllerApi.editPropertyUsingPUT(id, data)
  );
};
