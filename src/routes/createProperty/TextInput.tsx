import { FC } from "react";
import { Form } from "react-bootstrap";
import { Control, Controller } from "react-hook-form";
import { FormData } from "./formData";

interface TextInputProps {
  control: Control<FormData>;
  name: keyof FormData;
  placeholder: string;
  type?: "text" | "date";
}

export const TextInput: FC<TextInputProps> = ({
  control,
  name,
  placeholder,
  type = "text",
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { invalid, error } }) => (
        <Form.Group>
          <Form.Label>{placeholder}</Form.Label>
          <Form.Control
            type={type}
            placeholder={placeholder}
            isInvalid={invalid}
            {...field}
          />
          <Form.Control.Feedback type="invalid">
            {error?.message}
          </Form.Control.Feedback>
        </Form.Group>
      )}
    />
  );
};
