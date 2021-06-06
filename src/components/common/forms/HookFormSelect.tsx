import { Control, FieldPath, useController } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
} from "@material-ui/core";

interface HookFormSelectProps<ValueType extends number | string, T> {
  control: Control<T>;
  name: FieldPath<T>;
  items: { value: ValueType; label: string }[];
}

export const HookFormSelect = <ValueType extends number | string, T>({
  control,
  name,
  items,
}: HookFormSelectProps<ValueType, T>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({
    control,
    name,
    defaultValue: items?.[0]?.value,
  });
  return (
    <FormControl fullWidth variant="outlined">
      <Select {...field} error={invalid}>
        {items.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};
