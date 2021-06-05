import { useQuery } from "react-query";
import { LocationControllerApi } from "../generated/api";

const locationControllerApi = new LocationControllerApi(undefined, "");

export const useFetchStates = () => {
  return useQuery("states", async () => {
    const { data } = await locationControllerApi.getStatesUsingGET();
    return data;
  });
};

export const useFetchCities = (stateId: string | undefined) => {
  return useQuery(
    ["cities", stateId],
    async () => {
      const { data } = await locationControllerApi.getCitiesUsingGET(
        stateId ?? ""
      );
      return data;
    },
    {
      enabled: !!stateId,
    }
  );
};

export const useFetchTowns = (cityId: string | undefined) => {
  return useQuery(
    ["towns", cityId],
    async () => {
      const { data } = await locationControllerApi.getTownsUsingGET(
        cityId ?? ""
      );
      return data;
    },
    {
      enabled: !!cityId,
    }
  );
};
