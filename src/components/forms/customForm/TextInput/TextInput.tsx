import { Form } from "react-bootstrap";
import {
  ControllerRenderProps,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import React from "react";

interface TextInputProps<T> {
  name: Path<T>;
  placeholder: string;
  type?: "text" | "date";
  defaultValue?: string;
}

export const TextInput = <T,>({
  name,
  placeholder,
  type = "text",
  defaultValue = "",
}: TextInputProps<T>) => {
  const { control } = useFormContext();

  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    defaultValue,
  });
  return (
    <Form.Group>
      <Form.Label>{placeholder}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        isInvalid={invalid}
        {...(field as ControllerRenderProps)}
      />
      <Form.Control.Feedback type="invalid">
        {error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export const createCustomTextInput = <T,>() => (props: TextInputProps<T>) => (
  <TextInput<T> {...props} />
);
