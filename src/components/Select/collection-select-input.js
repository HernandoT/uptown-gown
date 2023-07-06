import { useQuery } from "@tanstack/react-query";

import * as React from "react";
import { getCollections } from "../../services/collection";
import SelectField from "../field/select";

const CollectionSelectInput = ({
  label = "Collection",
  placeholder = "Pilih Collection",
  name = "",
  required = false,
  disabled = false,
  helperText,
  options = [],
  onAfterChangeDetail,
  isCreateable = false,
  ...rest
}) => {
  const [_options, setOptions] = React.useState(options);
  const [isInitiate, setIsInitiate] = React.useState(false);
  const { data: collectionList, isFetching } = useQuery(
    ["get-collections"],
    () => getCollections()
  );

  React.useEffect(() => {
    if (!isInitiate && collectionList?.data) {
      collectionList.data.sort((a, b) =>
        a.nama.toLowerCase() > b.nama.toLowerCase() ? 1 : -1
      );
      const transformOptions = collectionList.data.map((data) => ({
        value: data.id,
        label: data.nama,
        extra: data,
      }));
      setOptions(transformOptions);
      setIsInitiate(true);
    }
  }, [collectionList?.data, isInitiate]);

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
      isCreateable={isCreateable}
      disabled={disabled}
      {...rest}
    />
  );
};

export default CollectionSelectInput;
