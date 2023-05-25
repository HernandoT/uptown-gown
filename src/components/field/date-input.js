import { DatePickerInput } from "@mantine/dates";

import { useController, useFormContext } from "react-hook-form";

const DateInputField = ({
  label = "",
  placeholder = "",
  name = "",
  type = "default",
  required = false,
  disabled = false,
  valueFormat = "DD MMM YYYY",
  size = "xl",
  ...rest
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  return (
    <DatePickerInput
      {...rest}
      {...field}
      inputWrapperOrder={["label", "input", "description", "error"]}
      error={fieldState.error?.message}
      label={label}
      placeholder={placeholder}
      withAsterisk={required}
      disabled={disabled}
      type={type}
      valueFormat={valueFormat}
      size={size}
      format
    />
  );
};

export default DateInputField;
