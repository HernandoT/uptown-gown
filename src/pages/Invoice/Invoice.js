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
  const [isInitiate, setIsInitiate] = React.useState(false);
  const [invoices, setInvoices] = React.useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const { data, isFetching } = useQuery(["get-invoices"], () => getInvoices());

  const { data: dataCustomers, isFetching: isFetchingCustomers } = useQuery(
    ["get-customers"],
    () => getCustomers()
  );

  React.useEffect(() => {
    if (!isFetching && !isFetchingCustomers && !isInitiate) {
      const _invoices = data?.data.map((invoice) => {
        const cust = dataCustomers.data.find((customer) => {
          return customer.id === invoice.id_customer;
        });
        invoice.email = cust.email;
        invoice.nama = cust.nama;
        invoice.nomor_telepon = cust.nomor_telepon;
        return invoice;
      });
      setInvoices(_invoices);
      setIsInitiate(true);
    }
  }, [
    data?.data,
    dataCustomers?.data,
    isFetching,
    isFetchingCustomers,
    isInitiate,
  ]);

  const columns = [
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    { field: "nama", headerName: "Nama", minWidth: 150, flex: 1 },
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
    { field: "harga_total", headerName: "Harga Total", minWidth: 120, flex: 1 },
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
      flex: 0.5,
      renderCell: ({ row }) => {
        const onClick = () => {
          navigate(`/admin/invoice/${row.id}`);
        };
        return <DetailButton onClick={onClick} />;
      },
    },
  ];

  const rows = [
    {
      id: 1,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "0813123456789",
      jenis: "Rent",
      tanggalAcara: "01/03/2023",
      hargaTotal: "Rp. 1.000.000",
      status: "Belum Lunas",
    },
    {
      id: 2,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "0813123456789",
      jenis: "Custom Rent",
      tanggalAcara: "01/03/2023",
      hargaTotal: "Rp. 1.000.000",
      status: "Belum Lunas",
    },
    {
      id: 3,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "0813123456789",
      jenis: "Custom Made",
      tanggalAcara: "01/03/2023",
      hargaTotal: "Rp. 1.000.000",
      status: "Belum Lunas",
    },
    {
      id: 4,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "0813123456789",
      jenis: "Rent",
      tanggalAcara: "01/03/2023",
      hargaTotal: "Rp. 1.000.000",
      status: "Lunas",
    },
    {
      id: 5,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "0813123456789",
      jenis: "Custom Rent",
      tanggalAcara: "01/03/2023",
      hargaTotal: "Rp. 1.000.000",
      status: "Lunas",
    },
    {
      id: 6,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "0813123456789",
      jenis: "Custom Made",
      tanggalAcara: "01/03/2023",
      hargaTotal: "Rp. 1.000.000",
      status: "Lunas",
    },
    {
      id: 7,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "0813123456789",
      jenis: "Rent",
      tanggalAcara: "01/03/2023",
      hargaTotal: "Rp. 1.000.000",
      status: "Selesai",
    },
    {
      id: 8,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "0813123456789",
      jenis: "Rent",
      tanggalAcara: "01/03/2023",
      hargaTotal: "Rp. 1.000.000",
      status: "Selesai",
    },
    {
      id: 9,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "0813123456789",
      jenis: "Rent",
      tanggalAcara: "01/03/2023",
      hargaTotal: "Rp. 1.000.000",
      status: "Selesai",
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
          />
          <button
            className="invoice-add"
            onClick={() => navigate("/admin/add-invoice")}
          >
            + TAMBAH INVOICE
          </button>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          {!isInitiate ? (
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
              style={{ marginTop: "3%", border: "none", height: "70vh" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Invoice;
