import { TextInput } from "@mantine/core";
import { useController, useFormContext } from "react-hook-form";

const TextInputField = ({
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
    <TextInput
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

export default TextInputField;
