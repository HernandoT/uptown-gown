import { useQuery } from "@tanstack/react-query";

import * as React from "react";
import { getTypes } from "../../services/type";
import { useController, useFormContext } from "react-hook-form";
import SelectField from "../field/select";

const TypeSelectInput = ({
  label = "Jenis",
  placeholder = "Pilih Jenis",
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
  const { data: typeList } = useQuery(["get-types"], () => getTypes());

  const options = React.useMemo(
    () =>
      (typeList?.data || []).map((_data) => ({
        value: _data.id,
        label: _data.nama_jenis,
        extra: _data,
      })),
    [typeList]
  );

  React.useEffect(() => {
    if (!!field.value) {
      const currentType = options.find((option) => option.id === field.value);
      onAfterDetail?.(currentType);
    }
  }, [options, field.value, onAfterDetail]);

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

export default TypeSelectInput;
