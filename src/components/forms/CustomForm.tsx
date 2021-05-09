import { FormProvider } from "react-hook-form";
import { UseCustomFormReturn } from "../../hooks/useCustomForm";
import React from "react";
import { Form } from "react-bootstrap";

type CustomFormProps<T> = {
  children: React.ReactNode;
} & UseCustomFormReturn<T>;

export const CustomForm = <T,>({
  methods,
  onSubmit,
  children,
}: CustomFormProps<T>) => (
  <FormProvider {...methods}>
    <Form onSubmit={onSubmit}>{children}</Form>
  </FormProvider>
);
