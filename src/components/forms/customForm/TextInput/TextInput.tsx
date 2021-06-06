import { Form } from "react-bootstrap";
import {
  ControllerRenderProps,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";

interface TextInputProps<T> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: "text" | "date";
  defaultValue?: string;
}

export const TextInput = <T,>({
  name,
  label,
  type = "text",
  defaultValue = "",
  placeholder = "",
}: TextInputProps<T>) => {
  const { control } = useFormContext();

  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    defaultValue: defaultValue as any,
  });
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
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

export const createCustomTextInput =
  <T,>() =>
  (props: TextInputProps<T>) =>
    <TextInput<T> {...props} />;
