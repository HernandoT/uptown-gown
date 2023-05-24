import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./Customer.css";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";

import * as React from "react";
import { useDisclosure } from "@mantine/hooks";
import CustomerForm from "./CustomerForm";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

const Customer = () => {
  const [customer, setCustomer] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const fetchCustomer = async () => {
    await getDocs(collection(db, "customer")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCustomer(newData);
    });
  };

  React.useEffect(() => {
    fetchCustomer();
  }, []);

  const columns = [
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    { field: "nama", headerName: "Nama", minWidth: 200, flex: 1 },
    {
      field: "nomor_telepon",
      headerName: "Nomor Telepon",
      minWidth: 200,
      flex: 1,
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
            rows={customer}
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
