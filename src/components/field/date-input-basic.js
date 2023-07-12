import dayjs from "dayjs";
import { useController, useFormContext } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DateInputFieldBasic = ({
  // label = "Tanggal",
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
        <DatePicker
          {...field}
          // label={label}
          placeholder={placeholder}
          required={required}
          format={format}
          value={field.value && dayjs(field.value)}
          error={!!fieldState.error?.message}
          helperText={fieldState.error?.message}
          disabled={disabled}
          InputLabelProps={{ shrink: true }}
          // disablePast={true}
          //default styles
          sx={{
            width: "50%",
          }}
          {...rest}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DateInputFieldBasic;
