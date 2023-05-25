import { Radio } from "@mantine/core";
import { useController, useFormContext } from "react-hook-form";

const RadioInputField = ({
  label = "",
  placeholder = "",
  name = "",
  required = false,
  disabled = false,
  options = [],
  ...rest
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });

  return (
    <Radio.Group
      {...field}
      label={label}
      placeholder={placeholder}
      withAsterisk={required}
      disabled={disabled}
      error={fieldState.error?.message}
    >
      {options.map((option) => (
        <Radio value={option.value} label={option.label} />
      ))}
    </Radio.Group>
  );
};

export default RadioInputField;
