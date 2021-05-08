import * as yup from "yup";

type Condition = "sale" | "rental";

export interface CreatePropertyFormData {
  title: string;
  price: number;
  condition: Condition;
  address: string;
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

export const schema = yup.object().shape({
  title: yup.string().required(),
  price: yup.number().positive().required(),
  condition: yup.string().oneOf(["sale", "rental"]).required(),
  address: yup.string().required(),
  squareFoot: yup.number().positive().required(),
  constructionDate: yup.date().required(),
  style: yup.string().required(),
  rooms: yup.number().positive().integer().required(),
  quarterBaths: yup.number().positive().integer().required(),
  halfBaths: yup.number().positive().integer().required(),
  threeQuarterBaths: yup.number().positive().integer().required(),
  fullBaths: yup.number().positive().integer().required(),
  expenses: yup.number().positive().required(),
  availabilitiesIncluded: yup.string(),
  constructionMaterial: yup.string(),
  securityMeasures: yup.string(),
  parkCharacteristics: yup.string(),
  youtubeLink: yup.string(),
  sellerContact: yup.string(),
  openHouseDays: yup.string(),
  additionalComments: yup.string(),
});
