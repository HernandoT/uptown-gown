import { MenuItem, TextField } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import * as React from "react";

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
  onAfterChangeDetail,
  onChangeExtend,
  ...rest
}) => {
  const { control } = useFormContext();
  const [currentValue, setCurrentValue] = React.useState();
  const { field, fieldState } = useController({ name, control });

  React.useEffect(() => {
    if (field?.value) {
      const currentOption = (options || []).find(
        (option) => option.value === field?.value
      );
      setCurrentValue(currentOption);
      onAfterChangeDetail?.(currentOption);
    }
  }, [field?.value, onAfterChangeDetail, options]);

  const hasValue =
    field.value !== "" && field.value !== null && field.value !== undefined;

  return (
    <TextField
      {...field}
      onChange={(e) => {
        onChangeExtend?.();
        field.onChange(e.target.value);
      }}
      InputLabelProps={{ shrink: hasValue }}
      fullWidth
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label={label}
      required={required}
      defaultValue={currentValue?.value}
      select
      error={!!fieldState.error?.message}
      helperText={fieldState.error?.message}
      maxDropdownHeight={maxDropdownHeight}
      disabled={disabled}
      {...rest}
    >
      {(options || []).map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectField;
