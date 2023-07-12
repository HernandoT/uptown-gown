import { useQuery } from "@tanstack/react-query";

import * as React from "react";
import { getSizes } from "../../services/size";
import SelectField from "../field/select";

const SizeSelectInput = ({
  label = "Ukuran",
  placeholder = "Pilih Ukuran",
  name = "",
  required = false,
  disabled = false,
  helperText,
  options = [],
  onAfterChangeDetail,
  onChangeExtend,

  ...rest
}) => {
  const [_options, setOptions] = React.useState(options);
  const [isInitiate, setIsInitiate] = React.useState(false);
  const { data: sizeList, isFetching } = useQuery(["get-sizes"], () =>
    getSizes()
  );

  React.useEffect(() => {
    if (!isInitiate && sizeList?.data) {
      sizeList.data.sort((a, b) =>
        a.nama_ukuran.toLowerCase() > b.nama_ukuran.toLowerCase() ? 1 : -1
      );
      const transformOptions = sizeList.data.map((data) => ({
        value: data.id,
        label: data.nama_ukuran,
        extra: data,
      }));
      setOptions(transformOptions);
      setIsInitiate(true);
    }
  }, [sizeList?.data, isInitiate]);

  if (isFetching) {
    return (
      <SelectField
        key="size-disabled"
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
      key="size-enabled"
      name={name}
      helperText={helperText}
      required={required}
      placeholder={placeholder}
      label={label}
      options={_options}
      onAfterChangeDetail={onAfterChangeDetail}
      onChangeExtend={onChangeExtend}
      {...rest}
    />
  );
};

export default SizeSelectInput;
