import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { getRentedDetailInvoiceItem } from "../services/detail-invoice-item";

const useGetRentedCount = () => {
  const { data, isFetching } = useQuery(["get-rented-item"], () =>
    getRentedDetailInvoiceItem()
  );

  const listRented = React.useMemo(() => {
    const _list = {};
    data?.items.map((item) => {
      if (_list[item.id_collection]) {
        _list[item.id_collection] += 1;
      } else {
        _list[item.id_collection] = 1;
      }
    });

    return _list;
  }, [data?.items]);

  const arrListRented = Object.entries(listRented).sort((a, b) => b[1] - a[1]);

  return { arrListRented, isFetching };
};

export default useGetRentedCount;
