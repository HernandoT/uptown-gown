import { useQuery } from "@tanstack/react-query";

import * as React from "react";
import { getInvoiceTypes } from "../../services/invoice-type";
import SelectField from "../field/select";

const InvoiceTypeSelectInput = ({
  label = "Jenis Invoice",
  placeholder = "Pilih Jenis Invoice",
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

  const { data: invoiceTypeList, isFetching } = useQuery(["get-invoice-types"], () =>
    getInvoiceTypes()
  );

  React.useEffect(() => {
    if (!isInitiate && invoiceTypeList?.data) {
      const transformOptions = invoiceTypeList.data.map((data) => ({
        value: data.id,
        label: data.nama_jenis_invoice,
        extra: data,
      }));
      setOptions(transformOptions);
      setIsInitiate(true);
    }
  }, [invoiceTypeList?.data, isInitiate]);

  if (isFetching) {
    return (
      <SelectField
        key="invoice-type-disabled"
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
      key="invoice-type-enabled"
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

export default InvoiceTypeSelectInput;
