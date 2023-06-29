import * as React from "react";
import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./Invoice.css";
import { useState } from "react";
import { TextField, InputAdornment, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import DetailButton from "../../components/DetailButton";
import { useNavigate } from "react-router-dom";
import { getInvoices } from "../../services/invoice";
import { getCustomers } from "../../services/customer";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const Invoice = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const { data, isFetching } = useQuery(["get-invoices"], () => getInvoices());

  const { data: dataCustomers, isFetching: isFetchingCustomers } = useQuery(
    ["get-customers"],
    () => getCustomers()
  );

  const invoices = React.useMemo(() => {
    if (!isFetching && !isFetchingCustomers) {
      let dataInvoice = data?.data;
      dataInvoice.sort((a, b) =>
        a.status_pelunasan.toLowerCase() > b.status_pelunasan.toLowerCase()
          ? 1
          : -1
      );
      const _invoices = dataInvoice.map((invoice) => {
        const cust = dataCustomers.data.find((customer) => {
          return customer.id === invoice.id_customer;
        });
        invoice.email = cust.email;
        invoice.nama = cust.nama;
        invoice.nomor_telepon = cust.nomor_telepon;
        return invoice;
      });
      return _invoices;
    }
  }, [data?.data, dataCustomers?.data, isFetching, isFetchingCustomers]);

  const columns = [
    { field: "email", headerName: "Email", minWidth: 150, flex: 1 },
    { field: "nama", headerName: "Nama", minWidth: 100, flex: 1 },
    {
      field: "nomor_telepon",
      headerName: "Nomor Telepon",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "id_jenis_invoice",
      headerName: "Jenis",
      minWidth: 120,
      flex: 1,
      renderCell: ({ row }) => {
        if (row.id_jenis_invoice === "custom_rent") return <>Custom Rent</>;
        else if (row.id_jenis_invoice === "custom_made")
          return <>Custom Made</>;
        else if (row.id_jenis_invoice === "rent") return <>Rent</>;
      },
    },
    {
      field: "tanggal_acara",
      headerName: "Tanggal Acara",
      minWidth: 120,
      flex: 1,
      renderCell: ({ row }) => {
        return <>{dayjs(row.tanggal_acara).format("DD/MM/YYYY")}</>;
      },
    },
    {
      field: "harga_total",
      headerName: "Harga Total",
      minWidth: 120,
      flex: 1,
      renderCell: ({ row }) => {
        function currencyFormat(num) {
          return (
            "Rp. " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
          );
        }
        return <>{currencyFormat(row.harga_total)}</>;
      },
    },
    {
      field: "status_pelunasan",
      headerName: "Status Pelunasan",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 50,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      renderCell: ({ row }) => {
        const onClick = () => {
          navigate(`/admin/invoice/${row.id}`);
        };
        return <DetailButton onClick={onClick} />;
      },
    },
  ];

  return (
    <div className="invoice">
      <AdminTitle props={"Invoice"} />
      <div className="invoice-content">
        <div className="invoice-search">
          <TextField
            id="search"
            type="search"
            label="Cari menurut nomor telepon"
            className="invoice-search-input"
            value={searchTerm}
            onChange={handleChange}
            sx={{ width: "65%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            style={{backgroundColor: "white"}}
          />
          <button
            className="invoice-add"
            onClick={() => navigate("/admin/add-invoice")}
          >
            + TAMBAH INVOICE
          </button>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          {invoices === undefined ? (
            <CircularProgress color="secondary" />
          ) : (
            <DataGrid
              rows={invoices}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 15]}
              style={{ marginTop: "3%", height: "70vh" }}
              className="card-container"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Invoice;
