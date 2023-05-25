import { NumberInput } from "@mantine/core";
import { useController, useFormContext } from "react-hook-form";

const NumberInputField = ({
  label = "",
  placeholder = "",
  name = "",
  required = false,
  disabled = false,
  hideControls = true,
  isCurrency = false,
  size = "xl",
  ...rest
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  return (
    <NumberInput
      {...rest}
      {...field}
      inputWrapperOrder={["label", "input", "description", "error"]}
      error={fieldState.error?.message}
      label={label}
      placeholder={placeholder}
      withAsterisk={required}
      disabled={disabled}
      hideControls={hideControls}
      size={size}
      {...(isCurrency
        ? {
            parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
            formatter: (value) =>
              !Number.isNaN(parseFloat(value))
                ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                : "",
          }
        : {})}
    />
  );
};

export default NumberInputField;
