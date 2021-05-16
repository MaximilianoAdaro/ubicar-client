import { useMutation } from "react-query";
import axios from "axios";
import { baseUrl } from "../config";

export type ID = number;
export type Time = string;

export interface CreatePropertyRequestData {
  amenities: ID[];
  openHouses: { day: Date; initialTime: Time; finalTime: Time }[];
  rooms: number;
  address: {
    town: ID;
    street: string;
    postalCode: string;
    department: string;
    number: number;
  };
  environments: number;
  comments: string;
  constructionYear: number;
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
    axios.post<CreatePropertyRequestData, any>(`${baseUrl}/create`, data)
  );
};
