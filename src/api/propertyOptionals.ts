import { useQuery } from "react-query";
import { OptionalsControllerApi } from "../generated/api";

const optionalsControllerApi = new OptionalsControllerApi(undefined, "");

export const useFetchPropertyTypes = () => {
  return useQuery("types", async () => {
    const { data } = await optionalsControllerApi.getTypesUsingGET();
    return data;
  });
};
export const useFetchPropertyStyles = () => {
  return useQuery("styles", async () => {
    const { data } = await optionalsControllerApi.getStylesUsingGET();
    return data;
  });
};
export const useFetchPropertyAmenities = () => {
  return useQuery("amenities", async () => {
    const { data } = await optionalsControllerApi.getAmenitiesUsingGET();
    return data;
  });
};
export const useFetchPropertySecurities = () => {
  return useQuery("securities", async () => {
    const { data } = await optionalsControllerApi.getSecuritiesUsingGET();
    return data;
  });
};
export const useFetchPropertyMaterials = () => {
  return useQuery("materials", async () => {
    const { data } = await optionalsControllerApi.getMaterialsUsingGET();
    return data;
  });
};
