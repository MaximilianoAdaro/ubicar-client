import { useQuery } from "react-query";
import { getPropertiesFilteredUsingPOST } from "../generated/endpoints";
import {
  GetPropertiesFilteredUsingPOSTParams,
  PropertyFilterDto,
} from "../generated/endpoints.schemas";

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
