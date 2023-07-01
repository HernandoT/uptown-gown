import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./Customer.css";
import { TextField, InputAdornment, CircularProgress } from "@mui/material";
import { darken, lighten, styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";

import * as React from "react";
import { useDisclosure } from "@mantine/hooks";
import CustomerForm from "./CustomerForm";
import { getCustomers } from "../../services/customer";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "@mantine/core";
import DetailButton from "../../components/DetailButton";

const defaultValues = {
  email: "",
  name: "",
  password: "123456",
  phoneNumber: "",
};

const Customer = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [currentData, setCurrentData] = React.useState(defaultValues);
  const [isEdit, setIsEdit] = React.useState(false);
  const [dataCustomer, setDataCustomer] = React.useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const { data, isFetching } = useQuery(["get-customers"], () =>
    getCustomers()
  );

  React.useEffect(() => {
    if (data?.data) {
      const dataCustomer = data?.data;
      dataCustomer.sort((a, b) =>
        a.nama.toLowerCase() > b.nama.toLowerCase() ? 1 : -1
      );
      setDataCustomer(dataCustomer);
    }
  }, [data?.data]);

  const columns = [
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    { field: "nama", headerName: "Nama", minWidth: 200, flex: 1 },
    {
      field: "nomor_telepon",
      headerName: "Nomor Telepon",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Action",
      minWidth: 50,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      renderCell: ({ row }) => {
        const onClick = () => {
          setCurrentData({
            email: row.email,
            name: row.nama,
            password: row.password,
            phoneNumber: row.nomor_telepon,
            disabled: row.disabled,
            id: row.id,
          });
          open();
          setIsEdit(true);
        };
        return (
          <>
            <DetailButton onClick={onClick} />
          </>
        );
      },
    },
  ];

  const onClickAdd = React.useCallback(() => {
    setCurrentData(defaultValues);
    setIsEdit(false);
    open();
  }, [open]);

  const getBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.7) : lighten(color, 0.7);

  const getHoverBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

  const getSelectedBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

  const getSelectedHoverBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.4) : lighten(color, 0.4);

  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    "& .super-app-theme--1": {
      backgroundColor: getBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode
      ),
      "&:hover": {
        backgroundColor: getHoverBackgroundColor(
          theme.palette.error.main,
          theme.palette.mode
        ),
      },
      "&.Mui-selected": {
        backgroundColor: getSelectedBackgroundColor(
          theme.palette.error.main,
          theme.palette.mode
        ),
        "&:hover": {
          backgroundColor: getSelectedHoverBackgroundColor(
            theme.palette.error.main,
            theme.palette.mode
          ),
        },
      },
    },
  }));

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
            style={{ backgroundColor: "white" }}
          />
          <button className="customer-add" onClick={onClickAdd}>
            + TAMBAH CUSTOMER
          </button>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          {isFetching ? (
            <CircularProgress color="secondary" />
          ) : (
            <StyledDataGrid
              rows={(dataCustomer || []).filter((customer) =>
                customer.nomor_telepon.includes(searchTerm.toLowerCase())
              )}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 15]}
              style={{ marginTop: "3%", height: "70vh" }}
              className="card-container"
              getRowClassName={(params) => `super-app-theme--${params.row.disabled}`}
            />
          )}
        </div>
      </div>
      <Modal opened={opened} centered onClose={close} withCloseButton={false}>
        <CustomerForm data={currentData} onClose={close} isEdit={isEdit} />
      </Modal>
    </div>
  );
};

export default Customer;
