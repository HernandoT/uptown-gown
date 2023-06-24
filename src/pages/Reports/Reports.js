import * as React from "react";
import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./Reports.css";
import { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../../services/expense";
import { getInvoicesByStatusSelesai } from "../../services/invoice";
import { getCustomers } from "../../services/customer";

const Reports = () => {
  const [startDate, setStartDate] = useState(dayjs().subtract(1, "month"));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const [isInitiate, setIsInitiate] = useState(false);
  const [reports, setReports] = useState([]);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalKredit, setTotalKredit] = useState(0);

  const { data: dataInvoices, isFetching: isFetchingInvoices } = useQuery(
    ["get-invoices"],
    () => getInvoicesByStatusSelesai()
  );
  const { data: dataCustomers, isFetching: isFetchingCustomers } = useQuery(
    ["get-customers"],
    () => getCustomers()
  );
  const { data: dataExpenses, isFetching: isFetchingExpenses } = useQuery(
    ["get-expenses"],
    () => getExpenses()
  );

  function currencyFormat(num) {
    if (num === 0) return "-";
    else
      return "Rp. " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  React.useEffect(() => {
    if (!isFetchingExpenses && !isFetchingInvoices && !isFetchingCustomers) {
      const reportsArr = [];
      let tempKredit = 0;
      let tempDebit = 0;
      dataInvoices.invoices
        .filter(
          (invoice) =>
            invoice.waktu_ubah >= startDate && invoice.waktu_ubah <= endDate
        )
        .map((invoice) => {
          const dataCustomer = dataCustomers.data.find(
            (customer) => customer.id === invoice.id_customer
          );
          const jenisInvoice =
            invoice.id_jenis_invoice === "rent"
              ? "Rent"
              : invoice.id_jenis_invoice === "custom_rent"
              ? "Custom Rent"
              : "Custom Made";
          const keterangan = `${jenisInvoice} - ${dataCustomer.nomor_telepon} - ${dataCustomer.nama}`;
          tempDebit += invoice.harga_total + invoice.biaya_tambahan;
          reportsArr.push({
            id: invoice.id,
            tanggal: invoice.waktu_ubah,
            keterangan: keterangan,
            debit: invoice.harga_total + invoice.biaya_tambahan,
            kredit: 0,
          });
        });
      setTotalDebit(tempDebit);
      dataExpenses.data
        .filter(
          (expense) =>
            expense.tanggal >= startDate && expense.tanggal <= endDate
        )
        .map((expense) => {
          tempKredit += expense.nominal;
          reportsArr.push({
            id: expense.id,
            tanggal: expense.tanggal,
            keterangan: expense.keterangan,
            debit: 0,
            kredit: expense.nominal,
          });
        });
      reportsArr.sort((a, b) => {
        return a.tanggal - b.tanggal;
      });
      setTotalKredit(tempKredit);
      setReports(reportsArr);
      setIsInitiate(true);
    }
  }, [
    endDate,
    isFetchingCustomers,
    isFetchingExpenses,
    isFetchingInvoices,
    startDate,
  ]);

  const columns = [
    {
      field: "tanggal",
      headerName: "Tanggal",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        return <>{dayjs(row.tanggal).format("DD/MM/YYYY")}</>;
      },
    },
    { field: "keterangan", headerName: "Keterangan", minWidth: 500, flex: 3 },
    {
      field: "debit",
      headerName: "Debit",
      minWidth: 200,
      flex: 2,
      renderCell: ({ row }) => {
        function currencyFormat(num) {
          if (num === 0) return "-";
          else
            return (
              "Rp. " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
            );
        }
        return <>{currencyFormat(row.debit)}</>;
      },
    },
    {
      field: "kredit",
      headerName: "Kredit",
      minWidth: 200,
      flex: 2,
      renderCell: ({ row }) => {
        function currencyFormat(num) {
          if (num === 0) return "-";
          else
            return (
              "Rp. " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
            );
        }
        return <>{currencyFormat(row.kredit)}</>;
      },
    },
  ];

  return (
    <div className="reports">
      <AdminTitle props={"Reports"} />
      <div className="reports-content">
        <div className="reports-search">
          <div className="reports-card">
            <div>
              <b>Total Debit: </b>
              {currencyFormat(totalDebit)}
            </div>
            <div>
              <b>Total Kredit: </b>
              {currencyFormat(totalKredit)}
            </div>
            <div>
              <b>Total Pendapatan: </b>
              {currencyFormat(totalDebit - totalKredit)}
            </div>
          </div>
          <div className="reports-date-filter">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Dari Tanggal"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  className="reports-datepicker"
                />
                <DatePicker
                  label="Sampai Tanggal"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  className="reports-datepicker"
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>
        {!isInitiate ? (
          <></>
        ) : (
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={reports}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 15]}
              style={{ marginTop: "1%", border: "none", height: "70vh" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
