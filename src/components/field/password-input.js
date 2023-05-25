import { PasswordInput } from "@mantine/core";
import { useController, useFormContext } from "react-hook-form";

const PasswordInputField = ({
  label = "",
  placeholder = "",
  name = "",
  required = false,
  disabled = false,
  ...rest
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  return (
    <PasswordInput
      {...rest}
      {...field}
      inputWrapperOrder={["label", "input", "description", "error"]}
      error={fieldState.error?.message}
      label={label}
      placeholder={placeholder}
      withAsterisk={required}
      disabled={disabled}
    />
  );
};

export default PasswordInputField;
