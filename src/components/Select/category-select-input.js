import { useQuery } from "@tanstack/react-query";

import * as React from "react";
import { getCategories } from "../../services/category";
import { useController, useFormContext } from "react-hook-form";
import SelectField from "../field/select";

const CategorySelectInput = ({
  label = "Kategori",
  placeholder = "Pilih Kategori",
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
  const { data: categoryList } = useQuery(["get-categories"], () =>
    getCategories()
  );

  const options = React.useMemo(
    () =>
      (categoryList?.data || []).map((_data) => ({
        value: _data.id,
        label: _data.nama_kategori,
        extra: _data,
      })),
    [categoryList]
  );

  React.useEffect(() => {
    if (!!field.value) {
      const currentCategory = options.find(
        (option) => option.id === field.value
      );
      onAfterDetail?.(currentCategory);
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

export default CategorySelectInput;
