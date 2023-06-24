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
      error={fieldState.error?.message}
      {...rest}
    >
      <div style={{ display: "flex" }}>
        {options.map((option) => (
          <Radio
            disabled={disabled}
            key={option.value}
            value={option.value}
            label={option.label}
            style={{ marginRight: 20 }}
          />
        ))}
      </div>
    </Radio.Group>
  );
};

export default RadioInputField;
