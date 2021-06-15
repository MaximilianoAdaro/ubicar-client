import { Control, FieldPath, useController } from "react-hook-form";
import { makeStyles, TextField } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField/TextField";
import clsx from "clsx";

type HookFormTextFieldProps<T> = TextFieldProps & {
  label: string;
  name: FieldPath<T>;
  control: Control<T>;
  defaultValue?: string;
  additionalStyles?: { [key: string]: string };
};

const useStyles = makeStyles((p) => ({
  root: (props) => ({
    "& div.MuiInputBase-formControl": {
      backgroundColor: "white",
      ...props,
    },
  }),
}));

export const HookFormTextField = <T,>({
  label,
  name,
  control,
  defaultValue = "",
  additionalStyles,
  ...rest
}: HookFormTextFieldProps<T>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({
    control,
    name,
    defaultValue: defaultValue as any,
  });
  const classes = useStyles(additionalStyles);
  return (
    <div>
      <TextField
        fullWidth
        variant={"outlined"}
        label={label}
        error={invalid}
        helperText={error?.message ?? " "}
        classes={{
          root: classes.root,
        }}
        {...field}
        {...rest}
      />
    </div>
  );
};
