import dayjs from "dayjs";
import { useController, useFormContext } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { MobileDatePicker } from "@mui/x-date-pickers";

const DateInputField = ({
  label = "Tanggal",
  placeholder = "",
  name = "",
  type = "default",
  disabled = false,
  required = false,
  format = "DD/MM/YYYY",
  ...rest
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <MobileDatePicker
          {...field}
          label={label}
          placeholder={placeholder}
          required={required}
          format={format}
          value={field.value && dayjs(field.value)}
          error={!!fieldState.error?.message}
          helperText={fieldState.error?.message}
          disabled={disabled}
          disablePast={true}
          //default styles
          sx={{
            width: "100%",
          }}
          {...rest}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DateInputField;
