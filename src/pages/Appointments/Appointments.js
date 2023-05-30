import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./Appointments.css";
import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const columns = [
    { field: "email", headerName: "Email", minWidth: 100, flex: 1 },
    { field: "nama", headerName: "Nama", minWidth: 100, flex: 1 },
    {
      field: "nomorTelepon",
      headerName: "Nomor Telepon",
      minWidth: 100,
      flex: 1,
    },
    { field: "tanggal", headerName: "Tanggal", minWidth: 100, flex: 1 },
    { field: "keterangan", headerName: "Keterangan", minWidth: 200, flex: 2 },
    { field: "status", headerName: "Status", minWidth: 100, flex: 1 },
    {
      field: "action",
      headerName: "Action",
      minWidth: 50,
      flex: 0.5,
      renderCell: (cellValues) => {
        return (
          <i
            class="fa fa-pencil"
            aria-hidden="true"
            onClick={() => console.log(cellValues)}
          ></i>
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "08123456789",
      tanggal: "23/02/2023",
      keterangan:
        "Saya ingin membuat appointment untuk membahas mengenai custom made dan melihat-lihat koleksi yang ada",
      status: "PENDING",
    },
    {
      id: 2,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "08123456789",
      tanggal: "23/02/2023",
      keterangan:
        "Saya ingin membuat appointment untuk membahas mengenai custom made dan melihat-lihat koleksi yang ada",
      status: "TERIMA",
    },
    {
      id: 3,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "08123456789",
      tanggal: "23/02/2023",
      keterangan:
        "Saya ingin membuat appointment untuk membahas mengenai custom made dan melihat-lihat koleksi yang ada",
      status: "TERIMA",
    },
    {
      id: 4,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "08123456789",
      tanggal: "23/02/2023",
      keterangan:
        "Saya ingin membuat appointment untuk membahas mengenai custom made dan melihat-lihat koleksi yang ada",
      status: "TERIMA",
    },
    {
      id: 5,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "08123456789",
      tanggal: "23/02/2023",
      keterangan:
        "Saya ingin membuat appointment untuk membahas mengenai custom made dan melihat-lihat koleksi yang ada",
      status: "TERIMA",
    },
    {
      id: 6,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "08123456789",
      tanggal: "23/02/2023",
      keterangan:
        "Saya ingin membuat appointment untuk membahas mengenai custom made dan melihat-lihat koleksi yang ada",
      status: "TERIMA",
    },
    {
      id: 7,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "08123456789",
      tanggal: "23/02/2023",
      keterangan:
        "Saya ingin membuat appointment untuk membahas mengenai custom made dan melihat-lihat koleksi yang ada",
      status: "TERIMA",
    },
    {
      id: 8,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "08123456789",
      tanggal: "23/02/2023",
      keterangan:
        "Saya ingin membuat appointment untuk membahas mengenai custom made dan melihat-lihat koleksi yang ada",
      status: "TERIMA",
    },
    {
      id: 9,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "08123456789",
      tanggal: "23/02/2023",
      keterangan:
        "Saya ingin membuat appointment untuk membahas mengenai custom made dan melihat-lihat koleksi yang ada",
      status: "TOLAK",
    },
  ];

  return (
    <div className="appointments">
      <AdminTitle props={"Appoinment"} />
      <div className="appointments-content">
        <div className="appointments-search">
          <TextField
            id="search"
            type="search"
            label="Cari menurut nomor telepon"
            className="appointments-search-input"
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
          <button className="appointments-add" onClick={() => navigate("/admin/add-appointment")}>+ TAMBAH APPOINTMENT</button>
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

export default Appointments;
