import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./Customer.css";
import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";

import * as React from "react";
import { useDisclosure } from "@mantine/hooks";
import CustomerForm from "./CustomerForm";

const Customer = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const columns = [
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    { field: "nama", headerName: "Nama", minWidth: 200, flex: 1 },
    {
      field: "nomorTelepon",
      headerName: "Nomor Telepon",
      minWidth: 200,
      flex: 1,
    },
  ];

  const rows = [
    {
      id: 1,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "0813123456789",
    },
    {
      id: 2,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "0813123456789",
    },
    {
      id: 3,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "0813123456789",
    },
    {
      id: 4,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "0813123456789",
    },
    {
      id: 5,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "0813123456789",
    },
    {
      id: 6,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "0813123456789",
    },
    {
      id: 7,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "0813123456789",
    },
    {
      id: 8,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "0813123456789",
    },
    {
      id: 9,
      email: "janedoe@gmail.com",
      nama: "Jane Doe",
      nomorTelepon: "0813123456789",
    },
  ];

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="customer">
      <AdminTitle props={"Customer"} />
      <div className="customer-content">
        <div className="customer-search">
          <TextField
            id="search"
            type="search"
            label="Cari menurut nomor telepon"
            className="customer-search-input"
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
          <button className="customer-add" onClick={open}>
            + TAMBAH CUSTOMER
          </button>
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
      <CustomerForm onClose={close} open={opened} />
    </div>
  );
};

export default Customer;
