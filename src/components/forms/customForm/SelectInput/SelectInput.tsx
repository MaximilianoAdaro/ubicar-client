import {
  ControllerRenderProps,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { Form } from "react-bootstrap";

interface SelectInputProps<T> {
  name: Path<T>;
  placeholder: string;
  options: SelectOption[];
}

interface SelectOption {
  value: string;
  displayName: string;
}

const SelectInput = <T,>({
  name,
  placeholder,
  options,
}: SelectInputProps<T>) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    defaultValue: options?.[0]?.value,
  });
  return (
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
  );
};

export const createCustomSelectInput =
  <T,>() =>
  (props: SelectInputProps<T>) =>
    <SelectInput<T> {...props} />;
