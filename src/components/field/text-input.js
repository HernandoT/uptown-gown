import { TextField } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";

const TextInputField = ({
  label = "",
  placeholder = "",
  name = "",
  required = false,
  disabled = false,
  multiline = false,
  ...rest
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  return (
    <TextField
      {...field}
      error={!!fieldState.error?.message}
      helperText={fieldState.error?.message}
      label={label}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      multiline={multiline}
      {...rest}
    />
  );
};

export default TextInputField;
