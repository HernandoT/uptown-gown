import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./Expense.css";
import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";

const Expense = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const columns = [
    { field: "tanggal", headerName: "Tanggal", minWidth: 200, flex: 1 },
    { field: "nominal", headerName: "Nominal", minWidth: 200, flex: 1 },
    { field: "keterangan", headerName: "Keterangan", minWidth: 600, flex: 3 },
    { field: "action", headerName: "Action", minWidth: 50, flex: 0.5 },
  ];

  const rows = [
    { id: 1, tanggal: "01/03/2023", nominal: "Rp. 500.000", keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000"},
    { id: 2, tanggal: "01/03/2023", nominal: "Rp. 500.000", keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000"},
    { id: 3, tanggal: "01/03/2023", nominal: "Rp. 500.000", keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000"},
    { id: 4, tanggal: "01/03/2023", nominal: "Rp. 500.000", keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000"},
    { id: 5, tanggal: "01/03/2023", nominal: "Rp. 500.000", keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000"},
    { id: 6, tanggal: "01/03/2023", nominal: "Rp. 500.000", keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000"},
    { id: 7, tanggal: "01/03/2023", nominal: "Rp. 500.000", keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000"},
    { id: 8, tanggal: "01/03/2023", nominal: "Rp. 500.000", keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000"},
    { id: 9, tanggal: "01/03/2023", nominal: "Rp. 500.000", keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000"},
  ];

  return (
    <div className="expense">
      <AdminTitle props={"Expense"} />
      <div className="expense-content">
        <div className="expense-search">
          <TextField
            id="search"
            type="search"
            label="Cari menurut keterangan"
            className="expense-search-input"
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
          <button className="expense-add">+ TAMBAH PENGELUARAN</button>
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

export default Expense;
