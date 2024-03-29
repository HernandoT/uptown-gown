import { useQuery } from "@tanstack/react-query";

import * as React from "react";
import { getCategories } from "../../services/category";
import SelectField from "../field/select";

const CategorySelectInput = ({
  label = "Kategori",
  placeholder = "Pilih Kategori",
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

  const { data: categoryList, isFetching } = useQuery(["get-categories"], () =>
    getCategories()
  );

  React.useEffect(() => {
    if (!isInitiate && categoryList?.data) {
      categoryList.data.sort((a, b) =>
        a.nama_kategori.toLowerCase() > b.nama_kategori.toLowerCase() ? 1 : -1
      );
      const transformOptions = categoryList.data.map((data) => ({
        value: data.id,
        label: data.nama_kategori,
        extra: data,
      }));
      setOptions(transformOptions);
      setIsInitiate(true);
    }
  }, [categoryList?.data, isInitiate]);

  if (isFetching) {
    return (
      <SelectField
        key="category-disabled"
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
      key="category-enabled"
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

export default CategorySelectInput;
