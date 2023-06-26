import { useQuery } from "@tanstack/react-query";

import * as React from "react";
import { getColors } from "../../services/color";
import SelectField from "../field/select";

const ColorSelectInput = ({
  label = "Warna",
  placeholder = "Pilih Warna",
  name = "",
  required = false,
  disabled = false,
  helperText,
  onAfterChangeDetail,
  options = [],
  onChangeExtend,
  ...rest
}) => {
  const [_options, setOptions] = React.useState(options);
  const [isInitiate, setIsInitiate] = React.useState(false);
  const { data: colorList, isFetching } = useQuery(["get-color"], () =>
    getColors()
  );

  React.useEffect(() => {
    if (!isInitiate && colorList?.data) {
      const transformOptions = colorList.data.map((data) => ({
        value: data.id,
        label: data.nama_warna,
        extra: data,
      }));
      setOptions(transformOptions);
      setIsInitiate(true);
    }
  }, [colorList?.data, isInitiate]);

  if (isFetching) {
    return (
      <SelectField
        key="color-disabled"
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
      key="color-enabled"
      name={name}
      helperText={helperText}
      required={required}
      placeholder={placeholder}
      label={label}
      options={_options}
      onChangeExtend={onChangeExtend}
      onAfterChangeDetail={onAfterChangeDetail}
      {...rest}
    />
  );
};

export default ColorSelectInput;
