import * as yup from "yup";

type Condition = "sale" | "rental";

interface Address {
  country: string;
  state: string;
  city: string;
  neighbourhood: string;
  postalCode: string;
  street: string;
  number: string;
  department: string;
}

export interface CreatePropertyFormData {
  title: string;
  price: number;
  condition: Condition;
  address: Address;
  squareFoot: number;
  constructionDate: Date;
  style: string;
  rooms: number;
  quarterBaths: number;
  halfBaths: number;
  threeQuarterBaths: number;
  fullBaths: number;
  expenses: number;
  availabilitiesIncluded?: string;
  constructionMaterial?: string;
  securityMeasures?: string;
  parkCharacteristics?: string;
  youtubeLink?: string;
  sellerContact?: string;
  openHouseDays?: string;
  additionalComments?: string;
}

const text = "Este campo es requerido";

export const schema = yup.object().shape({
  title: yup.string().required(text),
  price: yup.number().positive().required(text),
  condition: yup.string().oneOf(["sale", "rental"]).required(text),
  address: yup.object({
    country: yup.string().required(text),
    state: yup.string().required(text),
    city: yup.string().required(text),
    neighbourhood: yup.string().required(text),
    postalCode: yup.string().required(text),
    street: yup.string().required(text),
    number: yup.string().required(text),
    department: yup.string().required(text),
  }),
  squareFoot: yup.number().positive().required(text),
  constructionDate: yup.date().required(text),
  style: yup.string().required(text),
  rooms: yup.number().positive().integer().required(text),
  quarterBaths: yup.number().positive().integer().required(text),
  halfBaths: yup.number().positive().integer().required(text),
  threeQuarterBaths: yup.number().positive().integer().required(text),
  fullBaths: yup.number().positive().integer().required(text),
  expenses: yup.number().positive().required(text),
  availabilitiesIncluded: yup.string(),
  constructionMaterial: yup.string(),
  securityMeasures: yup.string(),
  parkCharacteristics: yup.string(),
  youtubeLink: yup.string(),
  sellerContact: yup.string(),
  openHouseDays: yup.string(),
  additionalComments: yup.string(),
});
