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
import {
  getInvoices,
  getInvoicesByStatusSelesai,
} from "../../services/invoice";
import { getCustomers } from "../../services/customer";
import { HiUserGroup } from "react-icons/hi";
import { BsPersonFillDash, BsPersonFillCheck } from "react-icons/bs";
import { FaWallet } from "react-icons/fa";
import ExportExcel from "../../components/ExcelExport/ExcelExport";
import { list } from "firebase/storage";

const Reports = () => {
  const [startDate, setStartDate] = useState(dayjs().subtract(1, "month"));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const [isInitiate, setIsInitiate] = useState(false);
  const [reports, setReports] = useState([]);
  const [excelReport, setExcelReport] = useState([]);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalKredit, setTotalKredit] = useState(0);

  const { data: dataInvoices, isFetching: isFetchingInvoices } = useQuery(
    ["get-invoices"],
    () => getInvoices()
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
  let reportsArr = [];
  let excelArr = [];
  let tempKredit = 0;
  let tempDebit = 0;

  const reportsArrLunas = React.useMemo(() => {
    const listReports = [];
    const dataInvoicesLunas = dataInvoices?.data;
    if (!isFetchingExpenses && !isFetchingInvoices && !isFetchingCustomers) {
      dataInvoicesLunas
        .filter(
          (invoice) =>
            invoice.waktu_buat >= startDate && invoice.waktu_buat <= endDate
        )
        .map((invoice) => {
          if ((invoice.status_pelunasan = "Belum Lunas")) {
            const dataCustomer = dataCustomers.data.find(
              (customer) => customer.id === invoice.id_customer
            );
            const jenisInvoice =
              invoice.id_jenis_invoice === "rent"
                ? "Rent"
                : invoice.id_jenis_invoice === "custom_rent"
                ? "Custom Rent"
                : "Custom Made";
            const keterangan = `Panjar Invoice ${invoice.id} - ${jenisInvoice} - ${dataCustomer.nomor_telepon} - ${dataCustomer.nama}`;
            tempDebit += invoice.panjar;
            listReports.push({
              id: invoice.id,
              tanggal: invoice.waktu_buat,
              keterangan: keterangan,
              penerimaan: invoice.panjar,
              pengeluaran: 0,
            });
            excelArr.push({
              Tanggal: invoice.waktu_ubah,
              Jenis: "Penerimaan",
              Keterangan: `Panjar Invoice ${invoice.id}`,
              Penerimaan: invoice.panjar,
              Pengeluaran: "-",
              IdInvoice: invoice.id,
              Customer: `${dataCustomer.nama} - ${dataCustomer.nomor_telepon}`,
            });
          }
        });
      return listReports;
    }
  }, [dataInvoices?.data]);

  const reportsArrBelumLunas = React.useMemo(() => {
    const listReports = [];
    const dataInvoicesBelumLunas = dataInvoices?.data;
    if (!isFetchingExpenses && !isFetchingInvoices && !isFetchingCustomers) {
      dataInvoicesBelumLunas
        .filter(
          (invoice) =>
            invoice.waktu_buat >= startDate && invoice.waktu_buat <= endDate
        )
        .map((invoice) => {
          if ((invoice.status_pelunasan = "Belum Lunas")) {
            const dataCustomer = dataCustomers.data.find(
              (customer) => customer.id === invoice.id_customer
            );
            const jenisInvoice =
              invoice.id_jenis_invoice === "rent"
                ? "Rent"
                : invoice.id_jenis_invoice === "custom_rent"
                ? "Custom Rent"
                : "Custom Made";
            const keterangan = `Panjar Invoice ${invoice.id} - ${jenisInvoice} - ${dataCustomer.nomor_telepon} - ${dataCustomer.nama}`;
            tempDebit += invoice.panjar;
            listReports.push({
              id: invoice.id,
              tanggal: invoice.waktu_buat,
              keterangan: keterangan,
              penerimaan: invoice.panjar,
              pengeluaran: 0,
            });
            excelArr.push({
              Tanggal: invoice.waktu_ubah,
              Jenis: "Penerimaan",
              Keterangan: `Panjar Invoice ${invoice.id}`,
              Penerimaan: invoice.panjar,
              Pengeluaran: "-",
              IdInvoice: invoice.id,
              Customer: `${dataCustomer.nama} - ${dataCustomer.nomor_telepon}`,
            });
          }
        });
      return listReports;
    }
  }, [dataInvoices?.data]);

  const reportsArrSelesai = React.useMemo(() => {
    const listReports = [];
    const dataInvoicesSelesai = dataInvoices?.data;
    if (!isFetchingExpenses && !isFetchingInvoices && !isFetchingCustomers) {
      dataInvoicesSelesai
        .filter(
          (invoice) =>
            invoice.waktu_buat >= startDate && invoice.waktu_buat <= endDate
        )
        .map((invoice) => {
          if ((invoice.status_pelunasan = "Belum Lunas")) {
            const dataCustomer = dataCustomers.data.find(
              (customer) => customer.id === invoice.id_customer
            );
            const jenisInvoice =
              invoice.id_jenis_invoice === "rent"
                ? "Rent"
                : invoice.id_jenis_invoice === "custom_rent"
                ? "Custom Rent"
                : "Custom Made";
            const keterangan = `Panjar Invoice ${invoice.id} - ${jenisInvoice} - ${dataCustomer.nomor_telepon} - ${dataCustomer.nama}`;
            tempDebit += invoice.panjar;
            listReports.push({
              id: invoice.id,
              tanggal: invoice.waktu_buat,
              keterangan: keterangan,
              penerimaan: invoice.panjar,
              pengeluaran: 0,
            });
            excelArr.push({
              Tanggal: invoice.waktu_ubah,
              Jenis: "Penerimaan",
              Keterangan: `Panjar Invoice ${invoice.id}`,
              Penerimaan: invoice.panjar,
              Pengeluaran: "-",
              IdInvoice: invoice.id,
              Customer: `${dataCustomer.nama} - ${dataCustomer.nomor_telepon}`,
            });
          }
        });
      return listReports;
    }
  }, [dataInvoices?.data, startDate, endDate]);

  React.useEffect(() => {
    if (reportsArrBelumLunas && reportsArrLunas && reportsArrSelesai) {
      reportsArr = [...reportsArrBelumLunas, ...reportsArrLunas, ...reportsArrSelesai];
      setIsInitiate(true);
      console.log(reportsArr)
    }
  }, [reportsArrBelumLunas, reportsArrLunas, reportsArrSelesai]);

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
    { field: "keterangan", headerName: "Keterangan", minWidth: 500, flex: 4 },
    {
      field: "penerimaan",
      headerName: "Penerimaan",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        function currencyFormat(num) {
          if (num === 0) return "-";
          else
            return (
              "Rp. " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
            );
        }
        return <>{currencyFormat(row.penerimaan)}</>;
      },
    },
    {
      field: "pengeluaran",
      headerName: "Pengeluaran",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        function currencyFormat(num) {
          if (num === 0) return "-";
          else
            return (
              "Rp. " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
            );
        }
        return <>{currencyFormat(row.pengeluaran)}</>;
      },
    },
  ];

  return (
    <div className="reports">
      <AdminTitle props={"Reports"} />
      <div className="reports-content">
        <div className="reports-search">
          <div className="reports-date-filter">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Dari Tanggal"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  className="reports-datepicker"
                  format="DD/MM/YYYY"
                />
                <DatePicker
                  label="Sampai Tanggal"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  className="reports-datepicker"
                  format="DD/MM/YYYY"
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <ExportExcel
            excelData={excelReport}
            fileName={`Reports-${startDate.format(
              "DD/MM/YYYY"
            )}-${endDate.format("DD/MM/YYYY")}`}
          />
        </div>
        <div className="reports-card">
          <div className="card-container">
            {/* <HiUserGroup className="reports-card-icon" /> */}
            <div style={{ flex: 1 }}>
              <div>Total Penerimaan</div>
              <div className="reports-card-value">
                {currencyFormat(totalDebit)}
              </div>
            </div>
          </div>
          <div className="card-container">
            {/* <BsPersonFillCheck className="reports-card-icon" /> */}
            <div style={{ flex: 1 }}>
              <div>Total Pengeluaran</div>
              <div className="reports-card-value">
                {currencyFormat(totalKredit)}
              </div>
            </div>
          </div>
          <div className="card-container">
            <FaWallet className="reports-card-icon" />
            <div style={{ flex: 1 }}>
              <div>Total Pendapatan</div>
              <div className="reports-card-value">
                {currencyFormat(totalDebit - totalKredit)}
              </div>
            </div>
          </div>
        </div>
        {!isInitiate ? (
          <></>
        ) : (
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid
              rows={reportsArr}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 15]}
              style={{ height: "58vh" }}
              className="card-container"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
