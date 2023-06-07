import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./Collections.css";
import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import DetailButton from "../../components/DetailButton";
import CollectionForm from "./CollectionForm";

const Collections = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const columns = [
    { field: "nama", headerName: "Nama", minWidth: 200, flex: 1 },
    { field: "warna", headerName: "Warna", minWidth: 100, flex: 1 },
    { field: "kategori", headerName: "Kategori", minWidth: 100, flex: 1 },
    { field: "jenis", headerName: "Jenis", minWidth: 100, flex: 1 },
    { field: "deskripsi", headerName: "Deskripsi", minWidth: 200, flex: 2 },
    { field: "status", headerName: "Status", minWidth: 100, flex: 1 },
    {
      field: "action",
      headerName: "Action",
      minWidth: 50,
      flex: 0.5,
      renderCell: (cellValues) => {
        const onClick = () => {};
        return <DetailButton onClick={onClick} />;
      },
    },
  ];

  const rows = [
    {
      id: 1,
      nama: "Pastel Pink Floral",
      warna: "Pink",
      kategori: "Party",
      jenis: "Wanita",
      deskripsi: "Gaun warna pastel pink dengan motif bunga yang terbaru",
      status: "Available",
    },
    {
      id: 2,
      nama: "Pastel Pink Floral",
      warna: "Pink",
      kategori: "Party",
      jenis: "Wanita",
      deskripsi: "Gaun warna pastel pink dengan motif bunga yang terbaru",
      status: "Available",
    },
    {
      id: 3,
      nama: "Pastel Pink Floral",
      warna: "Pink",
      kategori: "Party",
      jenis: "Wanita",
      deskripsi: "Gaun warna pastel pink dengan motif bunga yang terbaru",
      status: "Available",
    },
    {
      id: 4,
      nama: "Pastel Pink Floral",
      warna: "Pink",
      kategori: "Party",
      jenis: "Wanita",
      deskripsi: "Gaun warna pastel pink dengan motif bunga yang terbaru",
      status: "Available",
    },
    {
      id: 5,
      nama: "Pastel Pink Floral",
      warna: "Pink",
      kategori: "Party",
      jenis: "Wanita",
      deskripsi: "Gaun warna pastel pink dengan motif bunga yang terbaru",
      status: "Available",
    },
    {
      id: 6,
      nama: "Pastel Pink Floral",
      warna: "Pink",
      kategori: "Party",
      jenis: "Wanita",
      deskripsi: "Gaun warna pastel pink dengan motif bunga yang terbaru",
      status: "Available",
    },
    {
      id: 7,
      nama: "Pastel Pink Floral",
      warna: "Pink",
      kategori: "Party",
      jenis: "Wanita",
      deskripsi: "Gaun warna pastel pink dengan motif bunga yang terbaru",
      status: "Available",
    },
    {
      id: 8,
      nama: "Pastel Pink Floral",
      warna: "Pink",
      kategori: "Party",
      jenis: "Wanita",
      deskripsi: "Gaun warna pastel pink dengan motif bunga yang terbaru",
      status: "Available",
    },
    {
      id: 9,
      nama: "Pastel Pink Floral",
      warna: "Pink",
      kategori: "Party",
      jenis: "Wanita",
      deskripsi: "Gaun warna pastel pink dengan motif bunga yang terbaru",
      status: "Available",
    },
  ];

  return (
    <div className="collections">
      <AdminTitle props={"All Collections"} />
      <div className="collections-content">
        <div className="collections-search">
          <TextField
            id="search"
            type="search"
            label="Cari menurut nama"
            className="collections-search-input"
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
          <button className="collections-add">+ TAMBAH BARANG</button>
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

export default Collections;
