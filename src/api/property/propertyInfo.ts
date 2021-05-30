import { useQuery } from "react-query";
import axios from "axios";
import { baseUrl } from "../config";

export const useFetchPropertyTypes = () => {
  return useQuery<string[], Error>("types", async () => {
    const { data } = await axios.get<string[]>(`${baseUrl}/types`);
    return data;
  });
};

interface PropertyStyle {
  id: number;
  label: string;
}

export const useFetchPropertyStyles = () => {
  return useQuery<PropertyStyle[], Error>("styles", async () => {
    const { data } = await axios.get<PropertyStyle[]>(`${baseUrl}/styles`);
    return data;
  });
};

interface PropertyOptionalInfo {
  id: number;
  label: string;
}

export const useFetchPropertyAmenities = () => {
  return useQuery<PropertyOptionalInfo[], Error>("amenities", async () => {
    const { data } = await axios.get<PropertyOptionalInfo[]>(
      `${baseUrl}/amenities`
    );
    return data;
  });
};

export const useFetchPropertySecurities = () => {
  return useQuery<PropertyOptionalInfo[], Error>("securities", async () => {
    const { data } = await axios.get<PropertyOptionalInfo[]>(
      `${baseUrl}/securities`
    );
    return data;
  });
};

export const useFetchPropertyMaterials = () => {
  return useQuery<PropertyOptionalInfo[], Error>("materials", async () => {
    const { data } = await axios.get<PropertyOptionalInfo[]>(
      `${baseUrl}/materials`
    );
    return data;
  });
};
