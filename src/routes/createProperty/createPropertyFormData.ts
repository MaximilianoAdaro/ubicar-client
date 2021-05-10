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
  parkDescription?: string;
  comments?: string;
}

const requiredMessage = "Este campo es requerido";

export const schema = yup.object().shape({
  title: yup.string().required(requiredMessage),
  price: yup.number().positive().required(requiredMessage),
  condition: yup.string().oneOf(["sale", "rental"]).required(requiredMessage),
  address: yup.object({
    country: yup.string().required(requiredMessage),
    state: yup.string().required(requiredMessage),
    city: yup.string().required(requiredMessage),
    neighbourhood: yup.string().required(requiredMessage),
    postalCode: yup.string().required(requiredMessage),
    street: yup.string().required(requiredMessage),
    number: yup.string().required(requiredMessage),
    department: yup.string().required(requiredMessage),
  }),
  squareFoot: yup.number().positive().required(requiredMessage),
  constructionDate: yup.date().required(requiredMessage),
  style: yup.string().required(requiredMessage),
  rooms: yup.number().positive().integer().required(requiredMessage),
  quarterBaths: yup.number().positive().integer().required(requiredMessage),
  halfBaths: yup.number().positive().integer().required(requiredMessage),
  threeQuarterBaths: yup
    .number()
    .positive()
    .integer()
    .required(requiredMessage),
  fullBaths: yup.number().positive().integer().required(requiredMessage),
  expenses: yup.number().positive().required(requiredMessage),

  ///// non required fields
  parkDescription: yup.string(),
  comments: yup.string(),
});
