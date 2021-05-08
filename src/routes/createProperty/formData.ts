import * as yup from "yup";

type Condition = "sale" | "rental";

export interface FormData {
  title: string;
  price: number;
  condition: Condition;
  address: string;
  squareFoot: number;
  constructionDate: string;
  style: string;
  rooms: number;
  quarterBaths: number;
  halfBaths: number;
  threeQuarterBaths: number;
  fullBaths: number;
  expenses: number;
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
});
