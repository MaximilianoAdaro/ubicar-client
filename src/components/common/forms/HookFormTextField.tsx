import { Control, FieldPath, useController } from "react-hook-form";
import { TextField } from "@material-ui/core";

interface HookFormTextFieldProps<T> {
  label: string;
  name: FieldPath<T>;
  control: Control<T>;
  defaultValue?: string;
}

export const HookFormTextField = <T,>({
  label,
  name,
  control,
  defaultValue = "",
}: HookFormTextFieldProps<T>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({
    control,
    name,
    defaultValue: defaultValue as any,
  });
  return (
    <div>
      <TextField
        fullWidth
        variant={"outlined"}
        label={label}
        error={invalid}
        helperText={error?.message}
        {...field}
      />
    </div>
  );
};
