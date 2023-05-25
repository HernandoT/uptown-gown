import { useQuery } from "@tanstack/react-query";

import * as React from "react";
import { getColors } from "../../services/color";
import SelectField from "../field/select";
import { useController, useFormContext } from "react-hook-form";

const ColorSelectInput = ({
  label = "Warna",
  placeholder = "Pilih Warna",
  name = "",
  required = false,
  disabled = false,
  helperText,
  onAfterDetail,
  ...rest
}) => {
  const { control } = useFormContext();
  const { field } = useController({
    control,
    name,
  });
  const { data: colorList } = useQuery(["get-color"], () => getColors());

  const options = React.useMemo(
    () =>
      (colorList?.data || []).map((_data) => ({
        value: _data.id,
        label: [_data.nama_warna, _data.kode_hex]
          .filter((val) => !!val)
          .join(" - "),
        extra: _data,
      })),
    [colorList]
  );

  React.useEffect(() => {
    if (!!field.value) {
      const currentColor = options.find((option) => option.id === field.value);
      onAfterDetail?.(currentColor);
    }
  }, [options, field, onAfterDetail]);

  return (
    <SelectField
      name={name}
      helperText={helperText}
      required={required}
      placeholder={placeholder}
      label={label}
      options={options}
      {...rest}
    />
  );
};

export default ColorSelectInput;
