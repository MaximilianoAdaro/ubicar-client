import { Form } from "react-bootstrap";
import {
  ControllerRenderProps,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import React from "react";

interface TextInputAreaProps<T> {
  name: Path<T>;
  placeholder: string;
  type?: "text" | "date";
  defaultValue?: string;
}

export const TextAreaInput = <T,>({
  name,
  placeholder,
  type = "text",
  defaultValue = "",
}: TextInputAreaProps<T>) => {
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
        as={"textarea"}
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

export const createCustomTextInputArea = <T,>() => (
  props: TextInputAreaProps<T>
) => <TextAreaInput<T> {...props} />;
