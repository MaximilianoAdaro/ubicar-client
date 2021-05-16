import { useQuery } from "react-query";
import axios from "axios";
import { baseUrl } from "../config";

interface Data {
  id: number;
  displayName: string;
}

export const useFetchStates = () => {
  return useQuery<Data[]>("states", async () => {
    const { data } = await axios.get<Data[]>(`${baseUrl}/states`);
    return data;
  });
};

export const useFetchCities = (stateId: number) => {
  return useQuery<Data[]>(["cities", stateId], async () => {
    const { data } = await axios.get<Data[]>(`${baseUrl}/cities/${stateId}`);
    return data;
  });
};

export const useFetchTowns = (cityId: number) => {
  return useQuery<Data[]>(["towns", cityId], async () => {
    const { data } = await axios.get<Data[]>(`${baseUrl}/towns/${cityId}`);
    return data;
  });
};
