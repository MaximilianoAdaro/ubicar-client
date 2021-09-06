import axios from "axios";
import { useQuery } from "react-query";
import { getPropertiesFilteredUsingPOST } from "../generated/endpoints";
import {
  GetPropertiesFilteredUsingPOSTParams,
  PropertyFilterDto,
  CreatePropertyDTO,
  PropertyDTO,
} from "../generated/endpoints.schemas";
import customInstance from "../mutator/custom-instance";

export const getFilteredPropertiesQueryKey = (
  data: PropertyFilterDto,
  params?: GetPropertiesFilteredUsingPOSTParams
) => [`/filtered-properties`, data, ...(params ? [params] : [])];

export const useGetFilteredProperties = ({
  data,
  params,
}: {
  data: PropertyFilterDto;
  params?: GetPropertiesFilteredUsingPOSTParams;
}) => {
  return useQuery(getFilteredPropertiesQueryKey(data, params), () =>
    getPropertiesFilteredUsingPOST(data, params)
  );
};

export const getPropertyDtoRequest = (data: CreatePropertyDTO) => {
  return customInstance<PropertyDTO>({
    url: "/property/get-property-dto",
    method: "post",
    data,
  });
};

export const getPropertyDtoQueryKey = (data: CreatePropertyDTO) => [
  `/property/get-property-dto`,
  data,
];

export const useGetPropertyDto = (data: CreatePropertyDTO) => {
  return useQuery(getPropertyDtoQueryKey(data), () =>
    getPropertyDtoRequest(data)
  );
};
