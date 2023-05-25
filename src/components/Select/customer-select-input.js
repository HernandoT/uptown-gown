import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../../services/customer";

import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import SelectField from "../field/select";

const CustomerSelectInput = ({
  label = "Customer",
  placeholder = "Pilih Customer",
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
  const { data: customerList } = useQuery(["get-customers"], () =>
    getCustomers()
  );

  const options = React.useMemo(
    () =>
      (customerList?.data || []).map((_data) => ({
        value: _data.id,
        label: [_data.nama, _data.nomor_telepon]
          .filter((val) => !!val)
          .join(" - "),
        extra: _data,
      })),
    [customerList]
  );

  React.useEffect(() => {
    if (!!field.value) {
      const currentUser = options.find((option) => option.id === field.value);
      onAfterDetail?.(currentUser);
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

export default CustomerSelectInput;
