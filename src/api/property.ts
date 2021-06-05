import { useMutation, useQuery } from "react-query";
import axios from "axios";

interface Data {
  id: string;
  name: string;
}

export const useFetchStates = () => {
  return useQuery<Data[]>("states", async () => {
    const { data } = await axios.get<Data[]>(`/states`);
    return data;
  });
};

export const useFetchCities = (stateId: string | undefined) => {
  return useQuery<Data[]>(
    ["cities", stateId],
    async () => {
      const { data } = await axios.get<Data[]>(`/cities/${stateId}`);
      return data;
    },
    {
      enabled: !!stateId,
    }
  );
};

export const useFetchTowns = (cityId: string | undefined) => {
  return useQuery<Data[]>(
    ["towns", cityId],
    async () => {
      const { data } = await axios.get<Data[]>(`/towns/${cityId}`);
      return data;
    },
    {
      enabled: !!cityId,
    }
  );
};

export const useFetchPropertyTypes = () => {
  return useQuery<string[], Error>("types", async () => {
    const { data } = await axios.get<string[]>(`/types`);
    return data;
  });
};

interface PropertyStyle {
  id: string;
  label: string;
}

export const useFetchPropertyStyles = () => {
  return useQuery<PropertyStyle[], Error>("styles", async () => {
    const { data } = await axios.get<PropertyStyle[]>(`/styles`);
    return data;
  });
};

interface PropertyOptionalInfo {
  id: string;
  label: string;
}

export const useFetchPropertyAmenities = () => {
  return useQuery<PropertyOptionalInfo[], Error>("amenities", async () => {
    const { data } = await axios.get<PropertyOptionalInfo[]>(`/amenities`);
    return data;
  });
};

export const useFetchPropertySecurities = () => {
  return useQuery<PropertyOptionalInfo[], Error>("securities", async () => {
    const { data } = await axios.get<PropertyOptionalInfo[]>(`/securities`);
    return data;
  });
};

export const useFetchPropertyMaterials = () => {
  return useQuery<PropertyOptionalInfo[], Error>("materials", async () => {
    const { data } = await axios.get<PropertyOptionalInfo[]>(`/materials`);
    return data;
  });
};

export const useFetchProperties = () => {
  return useQuery("propertyPreview", async () => {
    const { data } = await axios.get(`/preview?page=0`);
    return data;
  });
};

export type ID = string;
export type Time = string;

export interface CreatePropertyRequestData {
  amenities: ID[];
  openHouse: { day: Date; initialTime: Time; finalTime: Time }[];
  rooms: number;
  address: {
    town_id: ID;
    street: string;
    postalCode: string;
    department: string;
    number: number;
  };
  environments: number;
  comments: string;
  constructionDate: number;
  coveredSquareFoot: number;
  title: string;
  type: string;
  security: ID[];
  links: string[];
  toilets: number;
  condition: string;
  parkDescription: string;
  materials: ID[];
  price: number;
  squareFoot: number;
  style: ID;
  fullBaths: number;
  levels: number;
  contacts: { label: string; email: string }[];
  expenses: number;
}

export const useCreateProperty = () => {
  return useMutation<any, Error, CreatePropertyRequestData>((data) =>
    axios.post<CreatePropertyRequestData, any>(`/create`, data)
  );
};
