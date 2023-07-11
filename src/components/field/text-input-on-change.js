import { TextField } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";

const TextInputOnChangeField = ({
  label = "",
  placeholder = "",
  name = "",
  required = false,
  disabled = false,
  multiline = false,
  rows = 1,
  onChange,
  ...rest
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const hasValue =
    field.value !== "" && field.value !== null && field.value !== undefined;
  return (
    <TextField
      {...field}
      InputLabelProps={{ shrink: hasValue }}
      error={!!fieldState.error?.message}
      helperText={fieldState.error?.message}
      label={label}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      onChange={onChange}
      {...rest}
    />
  );
};

export default TextInputOnChangeField;
