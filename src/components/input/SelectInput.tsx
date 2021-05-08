import {
  Control,
  Controller,
  ControllerRenderProps,
  Path,
} from "react-hook-form";
import { Form } from "react-bootstrap";

interface SelectInputProps<T> {
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
  options: SelectOption[];
}

interface SelectOption {
  value: string;
  displayName: string;
}

export const SelectInput = <T,>({
  control,
  name,
  placeholder,
  options,
}: SelectInputProps<T>) => {
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
            {...(field as ControllerRenderProps)}
          >
            {options.map(({ displayName, value }) => (
              <option key={value} value={value}>
                {displayName}
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
