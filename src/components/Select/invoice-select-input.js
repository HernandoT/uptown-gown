import { useQuery } from "@tanstack/react-query";

import * as React from "react";
import SelectField from "../field/select";
import { getInvoices, getInvoicesBelumLunas } from "../../services/invoice";
import { getCustomers } from "../../services/customer";

const InvoiceSelectInput = ({
  label = "Invoice",
  placeholder = "Pilih Invoice",
  name = "",
  required = false,
  disabled = false,
  helperText,
  onAfterChangeDetail,
  options = [],
  value = "",
  onChangeExtend,
  ...rest
}) => {
  const [_options, setOptions] = React.useState(options);
  const [isInitiate, setIsInitiate] = React.useState(false);

  const { data: invoiceList, isFetching } = useQuery(
    ["get-invoices"],
    () => getInvoices()
  );

  const { data: dataCustomers, isFetching: isFetchingCustomers } = useQuery(
    ["get-customers"],
    () => getCustomers()
  );

  React.useEffect(() => {
    if (!isInitiate && !isFetching && !isFetchingCustomers) {
      let invoices = invoiceList?.data;
      invoices.sort((a, b) =>
        a.status_pelunasan.toLowerCase() > b.status_pelunasan.toLowerCase()
          ? 1
          : -1
      );
      invoices = invoices.map((invoice) => {
        const cust = dataCustomers.data.find((customer) => {
          return customer.id === invoice.id_customer;
        });
        const jenisInvoice =
          invoice.id_jenis_invoice === "rent"
            ? "Rent"
            : invoice.id_jenis_invoice === "custom_rent"
            ? "Custom Rent"
            : "Custom Made";
        invoice.jenis_invoice = jenisInvoice;
        invoice.nama_customer = cust.nama;
        invoice.nomor_customer = cust.nomor_telepon;
        invoice.email_customer = cust.email;
        return invoice;
      });
      const transformOptions = invoices.map((data) => ({
        value: data.id,
        label: `${data.id} - ${data.nama_customer} - ${data.nomor_customer} - ${data.status_pelunasan}`,
        extra: data,
      }));
      transformOptions.unshift({value: "-", label: "Pengeluaran Operasional Umum"})
      setOptions(transformOptions);
      setIsInitiate(true);
    }
  }, [
    dataCustomers?.data,
    invoiceList?.invoices,
    isFetching,
    isFetchingCustomers,
    isInitiate,
  ]);

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
      onChangeExtend={onChangeExtend}
      onAfterChangeDetail={onAfterChangeDetail}
      {...rest}
    />
  );
};

export default InvoiceSelectInput;
