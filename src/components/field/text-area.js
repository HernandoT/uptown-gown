import { TextArea } from "@mantine/core";
import { useController, useFormContext } from "react-hook-form";

const TextAreaInputField = ({
  label = "",
  placeholder = "",
  name = "",
  required = false,
  disabled = false,
  size = "xl",
  ...rest
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  return (
    <TextArea
      {...rest}
      {...field}
      inputWrapperOrder={["label", "input", "description", "error"]}
      error={fieldState.error?.message}
      label={label}
      size={size}
      placeholder={placeholder}
      withAsterisk={required}
      disabled={disabled}
    />
  );
};

export default TextAreaInputField;
