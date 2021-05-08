import { Control, Controller } from "react-hook-form";
import { FormData } from "./formData";
import { FC } from "react";
import { Form } from "react-bootstrap";

interface SelectInputProps {
  control: Control<FormData>;
  name: keyof FormData;
  placeholder: string;
  options: {
    value: string;
    name: string;
  }[];
}

export const SelectInput: FC<SelectInputProps> = ({
  control,
  name,
  placeholder,
  options,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={options?.[0]?.value}
      render={({ field, fieldState: { invalid, error } }) => (
        <Form.Group>
          <Form.Label>{placeholder}</Form.Label>
          <Form.Control
            as="select"
            type="text"
            placeholder={placeholder}
            isInvalid={invalid}
            {...field}
          >
            {options.map(({ name, value }) => (
              <option key={value} value={value}>
                {name}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {error?.message}
          </Form.Control.Feedback>
        </Form.Group>
      )}
    />
  );
};
