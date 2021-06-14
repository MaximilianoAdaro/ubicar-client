/*
 * Generated by orval v5.4.7 🍺
 * Do not edit manually.
 * Api Documentation
 * Api Documentation
 * OpenAPI spec version: 1.0
 */
import { useMutation, UseMutationOptions } from "react-query";
import type { PropertyDTO } from "../endpoints.schemas";
import { customInstance } from "../../mutator/custom-instance";

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P
) => any
  ? P
  : never;

export const dislikePropertyUsingPUT = <TData = PropertyDTO | unknown>(
  id: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<TData>(
    { url: `/dislike/${id}`, method: "put", data: undefined },
    // eslint-disable-next-line
    // @ts-ignore
    options
  );
};

export const useDislikePropertyUsingPUT = <
  TData = PropertyDTO | unknown,
  TError = unknown,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    AsyncReturnType<typeof dislikePropertyUsingPUT>,
    TError,
    { id: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options || {};

  return useMutation<
    AsyncReturnType<typeof dislikePropertyUsingPUT>,
    TError,
    { id: string },
    TContext
  >((props) => {
    const { id } = props || {};

    return dislikePropertyUsingPUT<TData>(id, requestOptions);
  }, mutationOptions);
};
export const likePropertyUsingPUT = <TData = PropertyDTO | unknown>(
  id: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<TData>(
    { url: `/like/${id}`, method: "put", data: undefined },
    // eslint-disable-next-line
    // @ts-ignore
    options
  );
};

export const useLikePropertyUsingPUT = <
  TData = PropertyDTO | unknown,
  TError = unknown,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    AsyncReturnType<typeof likePropertyUsingPUT>,
    TError,
    { id: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options || {};

  return useMutation<
    AsyncReturnType<typeof likePropertyUsingPUT>,
    TError,
    { id: string },
    TContext
  >((props) => {
    const { id } = props || {};

    return likePropertyUsingPUT<TData>(id, requestOptions);
  }, mutationOptions);
};
