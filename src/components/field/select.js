import { MenuItem, TextField } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";

const SelectField = ({
  label = "",
  placeholder = "",
  name = "",
  required = false,
  disabled = false,
  options = [],
  noOptionMessage = "",
  maxDropdownHeight = 280,
  helperText = "",
  ...rest
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });

  // console.log(options);
  return (
    <TextField
      {...field}
      fullWidth
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label={label}
      required={required}
      select
      error={!!fieldState.error?.message}
      helperText={fieldState.error?.message}
      maxDropdownHeight={maxDropdownHeight}
      {...rest}
    >
      {options.map((option) => (
        <MenuItem value={option.value}>{option.label}</MenuItem>
      ))}
    </TextField>
  );
};

export default SelectField;
