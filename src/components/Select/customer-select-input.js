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
  options = [],
  value = "",
  ...rest
}) => {
  const [_options, setOptions] = React.useState(options);
  const [isInitiate, setIsInitiate] = React.useState(false);

  const { data: customerList } = useQuery(["get-customers"], () =>
    getCustomers()
  );

  React.useEffect(() => {
    if (!isInitiate && customerList?.data) {
      const transformOptions = customerList.data.map((data) => ({
        value: data.id,
        label: data.nama,
        extra: data,
      }));
      setOptions(transformOptions);
      setIsInitiate(true);
    }
  }, [customerList?.data, isInitiate]);

  React.useEffect(() => {
    if (!!value) {
      const currentUser = _options.find((_option) => _option.value === value);
      onAfterDetail?.(currentUser);
    }
  }, [onAfterDetail, _options, value]);

  return (
    <SelectField
      name={name}
      helperText={helperText}
      required={required}
      placeholder={placeholder}
      label={label}
      options={_options}
      {...rest}
    />
  );
};

export default CustomerSelectInput;
