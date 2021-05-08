import { Form } from "react-bootstrap";
import {
  Control,
  Controller,
  ControllerRenderProps,
  Path,
} from "react-hook-form";

interface TextInputProps<T> {
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
  type?: "text" | "date";
}

export const TextInput = <T,>({
  control,
  name,
  placeholder,
  type = "text",
}: TextInputProps<T>) => {
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
            {...(field as ControllerRenderProps)}
          />
          <Form.Control.Feedback type="invalid">
            {error?.message}
          </Form.Control.Feedback>
        </Form.Group>
      )}
    />
  );
};
