import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./Invoice.css";
import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";

const Invoice = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const columns = [
    { field: "email", headerName: "Email", width: 200 },
    { field: "nama", headerName: "Nama", width: 150 },
    { field: "nomorTelepon", headerName: "Nomor Telepon", width: 150 },
    { field: "jenis", headerName: "Jenis", width: 120 },
    { field: "tanggalAcara", headerName: "Tanggal Acara", width: 120 },
    { field: "hargaTotal", headerName: "Harga Total", width: 120 },
    { field: "status", headerName: "Status Pelunasan", width: 150 },
    { field: "action", headerName: "Action", width: 50 },
  ];

  const rows = [
    { id: 1, email: "janedoe@gmail.com", nama: "Jane Doe", nomorTelepon: "0813123456789", jenis: "Rent", tanggalAcara: "01/03/2023", hargaTotal: "Rp. 1.000.000", status: "Belum Lunas"},
    { id: 2, email: "janedoe@gmail.com", nama: "Jane Doe", nomorTelepon: "0813123456789", jenis: "Custom Rent", tanggalAcara: "01/03/2023", hargaTotal: "Rp. 1.000.000", status: "Belum Lunas" },
    { id: 3, email: "janedoe@gmail.com", nama: "Jane Doe", nomorTelepon: "0813123456789", jenis: "Custom Made", tanggalAcara: "01/03/2023", hargaTotal: "Rp. 1.000.000", status: "Belum Lunas" },
    { id: 4, email: "janedoe@gmail.com", nama: "Jane Doe", nomorTelepon: "0813123456789", jenis: "Rent", tanggalAcara: "01/03/2023", hargaTotal: "Rp. 1.000.000", status: "Lunas" },
    { id: 5, email: "janedoe@gmail.com", nama: "Jane Doe", nomorTelepon: "0813123456789", jenis: "Custom Rent", tanggalAcara: "01/03/2023", hargaTotal: "Rp. 1.000.000", status: "Lunas" },
    { id: 6, email: "janedoe@gmail.com", nama: "Jane Doe", nomorTelepon: "0813123456789", jenis: "Custom Made", tanggalAcara: "01/03/2023", hargaTotal: "Rp. 1.000.000", status: "Lunas" },
    { id: 7, email: "janedoe@gmail.com", nama: "Jane Doe", nomorTelepon: "0813123456789", jenis: "Rent", tanggalAcara: "01/03/2023", hargaTotal: "Rp. 1.000.000", status: "Selesai" },
    { id: 8, email: "janedoe@gmail.com", nama: "Jane Doe", nomorTelepon: "0813123456789", jenis: "Rent", tanggalAcara: "01/03/2023", hargaTotal: "Rp. 1.000.000", status: "Selesai" },
    { id: 9, email: "janedoe@gmail.com", nama: "Jane Doe", nomorTelepon: "0813123456789", jenis: "Rent", tanggalAcara: "01/03/2023", hargaTotal: "Rp. 1.000.000", status: "Selesai" },
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
          <button className="invoice-add">+ TAMBAH INVOICE</button>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 15]}
            style={{ marginTop: "3%", border: "none", height: "70vh" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Invoice;
