import { useQuery } from "react-query";
import axios from "axios";
import { baseUrl } from "../config";

interface PropertyType {
  id: number;
  label: string;
}

export const useFetchPropertyTypes = () => {
  return useQuery<PropertyType[], Error>("propertyTypes", async () => {
    const { data } = await axios.get<PropertyType[]>(
      `${baseUrl}/propertyTypes`
    );
    return data;
  });
};

interface PropertyStyle {
  id: number;
  displayName: string;
}

export const useFetchPropertyStyles = () => {
  return useQuery<PropertyStyle[], Error>("propertyStyles", async () => {
    const { data } = await axios.get<PropertyStyle[]>(
      `${baseUrl}/propertyStyles`
    );
    return data;
  });
};

interface PropertyOptionalInfo {
  id: number;
  name: string;
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
