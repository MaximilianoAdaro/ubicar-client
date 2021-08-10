import { Form, InputGroup } from "react-bootstrap";
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
  frontSymbol?: string;
}

export const TextInput = <T,>({
  name,
  label,
  type = "text",
  defaultValue = "",
  placeholder = "",
  frontSymbol,
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
      <InputGroup hasValidation>
        {frontSymbol && (
          <InputGroup.Prepend>
            <InputGroup.Text>{frontSymbol}</InputGroup.Text>
          </InputGroup.Prepend>
        )}
        <Form.Control
          type={type}
          placeholder={placeholder}
          isInvalid={invalid}
          {...(field as ControllerRenderProps)}
        />
        <Form.Control.Feedback type="invalid">
          {error?.message}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};

export const createCustomTextInput =
  <T,>() =>
  (props: TextInputProps<T>) =>
    <TextInput<T> {...props} />;
