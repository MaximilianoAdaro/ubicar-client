import { Path, useController, useFormContext } from "react-hook-form";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

interface RadioInputProps<T> {
  name: Path<T>;
  options: RadioOption[];
}

export interface RadioOption {
  value: string;
  displayName: string;
}

const ComposedRadioInput = <T,>({ name, options }: RadioInputProps<T>) => {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
    defaultValue: options?.[0]?.value,
  });

  return (
    <ToggleButtonGroup type="radio" {...field}>
      {options.map(({ displayName, value }) => (
        <ToggleButton key={value} variant="outline-dark" value={value}>
          {displayName}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export const createCustomRadioInput =
  <T,>() =>
  (props: RadioInputProps<T>) =>
    <ComposedRadioInput<T> {...props} />;
