import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../../services/customer";

import * as React from "react";
import SelectField from "../field/select";

const CustomerSelectInput = ({
  label = "Customer",
  placeholder = "Pilih Customer",
  name = "",
  required = false,
  disabled = false,
  helperText,
  onAfterChangeDetail,
  options = [],
  value = "",
  ...rest
}) => {
  const [_options, setOptions] = React.useState(options);
  const [isInitiate, setIsInitiate] = React.useState(false);

  const { data: customerList, isFetching } = useQuery(["get-customers"], () =>
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

  if (isFetching) {
    return (
      <SelectField
        key="disabled"
        name={name}
        placeholder={placeholder}
        label={label}
        options={_options}
        disabled={true}
        onAfterChangeDetail={onAfterChangeDetail}
        {...rest}
      />
    );
  }

  return (
    <SelectField
      key="enabled"
      name={name}
      helperText={helperText}
      required={required}
      placeholder={placeholder}
      label={label}
      options={_options}
      disabled={disabled}
      onAfterChangeDetail={onAfterChangeDetail}
      {...rest}
    />
  );
};

export default CustomerSelectInput;
