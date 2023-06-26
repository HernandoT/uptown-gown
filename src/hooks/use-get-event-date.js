import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { getItemByIdCollection } from "../services/detail-invoice-item";
import { getInvoices } from "../services/invoice";

const useGetEventDate = (idCollection) => {
  const { data, isFetching } = useQuery(["get-item-by-id-collection"], () =>
    getItemByIdCollection(idCollection)
  );
  const { data: dataInvoice } = useQuery(["get-invoices"], () => getInvoices());

  const listEventDate = React.useMemo(() => {
    const _list = [];
    if (dataInvoice?.data) {
      data?.items.map((item) => {
        const invoice = dataInvoice?.data.filter((inv) => {
          return inv.id === item.id_invoice;
        });
        invoice.map((inv) => _list.push(inv.tanggal_acara));
      });
    }

    return _list;
  }, [data?.items, dataInvoice?.data]);

  return { listEventDate, isFetching };
};

export default useGetEventDate;
