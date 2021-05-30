import { Control, FieldPath, useController } from "react-hook-form";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ControllerRenderProps } from "react-hook-form/dist/types/controller";

interface HookFormDatePickerProps<T> {
  label: string;
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: Date;
}

export const HookFormDatePicker = <T,>({
  label,
  control,
  name,
  defaultValue = new Date(),
}: HookFormDatePickerProps<T>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({
    control,
    name,
    defaultValue: defaultValue as any,
  });
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        fullWidth
        autoOk
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="dd/MM/yyyy"
        error={invalid}
        helperText={error?.message}
        {...(field as ControllerRenderProps)}
      />
    </MuiPickersUtilsProvider>
  );
};
