import { Control, FieldPath, useController } from "react-hook-form";
import { useState } from "react";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { MdVisibility, MdVisibilityOff } from "react-icons/all";

interface HookFormPasswordInputProps<T> {
  label: string;
  name: FieldPath<T>;
  control: Control<T>;
  defaultValue?: string;
}

export const HookFormPasswordInput = <T,>({
  label,
  name,
  control,
  defaultValue = "",
}: HookFormPasswordInputProps<T>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({
    control,
    name,
    defaultValue: defaultValue as any,
  });
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <FormControl variant="outlined" fullWidth error={invalid} {...field}>
        <InputLabel htmlFor={`${name} ${label}`}>{label}</InputLabel>
        <OutlinedInput
          id={`${name} ${label}`}
          type={isVisible ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setIsVisible((v) => !v)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {isVisible ? <MdVisibility /> : <MdVisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
          fullWidth
        />
        <FormHelperText>{error?.message ?? " "}</FormHelperText>
      </FormControl>
    </div>
  );
};
