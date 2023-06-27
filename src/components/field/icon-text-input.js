import * as React from "react";
import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useController, useFormContext } from "react-hook-form";


const IconTextInputField = ({
  label = "",
  placeholder = "",
  name = "",
  required = false,
  disabled = false,
  icon = null,
  ...rest
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  return (
    <FormControl
      variant="outlined"
      fullWidth
      className="edit-profile-form"
      error={!!fieldState.error?.message}
      {...rest}
    >
      <InputLabel htmlFor="outlined-adornment-amount">{label}</InputLabel>
      <OutlinedInput
        {...field}
        label={label}
        id="outlined-adornment-amount"
        disabled={disabled}
        startAdornment={
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        }
      />
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
};

export default IconTextInputField;
