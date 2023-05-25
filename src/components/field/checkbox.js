import { Checkbox } from "@mantine/core";
import { useController, useFormContext } from "react-hook-form";

const CheckboxField = ({
  label = "",
  labelPosition = "right",
  placeholder = "",
  name = "",
  required = false,
  disabled = false,
  hideControls = true,
  ...rest
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  return (
    <Checkbox
      {...rest}
      {...field}
      inputWrapperOrder={["label", "input", "description", "error"]}
      error={fieldState.error?.message}
      label={label}
      placeholder={placeholder}
      withAsterisk={required}
      disabled={disabled}
      hideControls={hideControls}
      labelPosition={labelPosition}
    />
  );
};

export default CheckboxField;
