import { useQuery } from "@tanstack/react-query";

import * as React from "react";
import { getTypes } from "../../services/type";
import SelectField from "../field/select";

const TypeSelectInput = ({
  label = "Jenis",
  placeholder = "Pilih Jenis",
  name = "",
  required = false,
  disabled = false,
  helperText,
  options = [],
  onAfterChangeDetail,
  ...rest
}) => {
  const [_options, setOptions] = React.useState(options);
  const [isInitiate, setIsInitiate] = React.useState(false);
  const { data: typeList, isFetching } = useQuery(["get-types"], () =>
    getTypes()
  );

  React.useEffect(() => {
    if (!isInitiate && typeList?.data) {
      const transformOptions = typeList.data.map((data) => ({
        value: data.id,
        label: data.nama_jenis,
        extra: data,
      }));
      setOptions(transformOptions);
      setIsInitiate(true);
    }
  }, [typeList?.data, isInitiate]);

  if (isFetching) {
    return (
      <SelectField
        key="type-disabled"
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
      key="type-enabled"
      name={name}
      helperText={helperText}
      required={required}
      placeholder={placeholder}
      label={label}
      options={_options}
      onAfterChangeDetail={onAfterChangeDetail}
      {...rest}
    />
  );
};

export default TypeSelectInput;
