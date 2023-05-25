import { Select } from "@mantine/core";
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
  ...rest
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  return (
    <Select
      {...field}
      {...rest}
      label={label}
      data={options}
      placeholder={placeholder}
      nothingFound={noOptionMessage}
      searchable
      inputWrapperOrder={["label", "input", "description", "error"]}
      error={fieldState.error?.message}
      withAsterisk={required}
      disabled={disabled}
      onChange={(value) => console.log(value)}
      maxDropdownHeight={maxDropdownHeight}
    />
  );
};

export default SelectField;
