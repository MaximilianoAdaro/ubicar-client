import { useMutation, useQuery } from "react-query";
import { CreatePropertyDTO, PropertyControllerApi } from "../generated/api";

const propertyControllerApi = new PropertyControllerApi(undefined, "");

export const useFetchProperties = () => {
  return useQuery("propertyPreview", async () => {
    const { data } = await propertyControllerApi.getPropertiesUsingGET(0);
    return data;
  });
};

export const useGetPropertyById = (id: string) =>
  useQuery(["property", id], async () => {
    const { data } = await propertyControllerApi.getPropertyUsingGET(id);
    return data;
  });

export const useCreateProperty = () => {
  return useMutation(async (data: CreatePropertyDTO) => {
    const { data: res } = await propertyControllerApi.createPropertyUsingPOST(
      data
    );
    return res;
  });
};
