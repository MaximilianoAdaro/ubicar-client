import { AnyObjectSchema } from "yup";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";

export interface UseCustomFormArgs<T> {
  schema?: AnyObjectSchema;
  onSubmit: SubmitHandler<T>;
}

export interface UseCustomFormReturn<T> {
  methods: UseFormReturn<T>;
  onSubmit: (e?: React.BaseSyntheticEvent | undefined) => Promise<void>;
}

export const useCustomForm = <T>({
  schema,
  onSubmit,
}: UseCustomFormArgs<T>): UseCustomFormReturn<T> => {
  const methods = useForm<T>({
    resolver: schema && yupResolver(schema),
    mode: "onBlur",
  });
  const handleSubmit = methods.handleSubmit(onSubmit);
  return { methods, onSubmit: handleSubmit };
};
