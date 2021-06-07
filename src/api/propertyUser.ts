import { PropertyUserControllerApi } from "../generated/api";

const propertyUserControllerApi = new PropertyUserControllerApi(undefined, "");

export const likeProperty = (id: string) => {
  return propertyUserControllerApi.likePropertyUsingPUT(id);
};

export const dislikeProperty = (id: string) => {
  return propertyUserControllerApi.dislikePropertyUsingPUT(id);
};
