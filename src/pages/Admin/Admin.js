import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./Admin.css";
import { TextField, InputAdornment, CircularProgress } from "@mui/material";
import { darken, lighten, styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";

import * as React from "react";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "@mantine/core";
import DetailButton from "../../components/DetailButton";
import { getAdmin, getAdmins } from "../../services/admin";
import AdminForm from "./AdminForm";

const defaultValues = {
  email: "",
  nama: "",
  password: "123456",
  nomor_telepon: "",
  main: "",
};

const Admin = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [currentData, setCurrentData] = React.useState(defaultValues);
  const [isEdit, setIsEdit] = React.useState(false);
  const [column, setColumn] = React.useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const { data, isFetching } = useQuery(["get-admins"], () => getAdmins());

  const { data: dataAdmin, isFetching: isFetchingAdmin } = useQuery(
    ["get-admin"],
    () => getAdmin(localStorage.getItem("idAdmin"))
  );

  React.useEffect(() => {
    if (!isFetching && !isFetchingAdmin) {
      if (dataAdmin?.admin.main === "1") {
        setColumn([
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
                  nama: row.nama,
                  password: row.password,
                  nomor_telepon: row.nomor_telepon,
                  main: row.main,
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
        ]);
      } else {
        setColumn([
          { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
          { field: "nama", headerName: "Nama", minWidth: 200, flex: 1 },
          {
            field: "nomor_telepon",
            headerName: "Nomor Telepon",
            minWidth: 200,
            flex: 1,
          },
        ]);
      }
    }
  }, [data?.data, dataAdmin?.admin.main, isFetching, isFetchingAdmin, open]);

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
        theme.palette.warning.main,
        theme.palette.mode
      ),
      "&:hover": {
        backgroundColor: getHoverBackgroundColor(
          theme.palette.warning.main,
          theme.palette.mode
        ),
      },
      "&.Mui-selected": {
        backgroundColor: getSelectedBackgroundColor(
          theme.palette.warning.main,
          theme.palette.mode
        ),
        "&:hover": {
          backgroundColor: getSelectedHoverBackgroundColor(
            theme.palette.warning.main,
            theme.palette.mode
          ),
        },
      },
    },
  }));

  return (
    <div className="customer">
      <AdminTitle props={"Admin"} />
      <div className="customer-content">
        {!isFetching && !isFetchingAdmin ? (
          <>
            <div className="customer-search">
              <TextField
                id="search"
                type="search"
                label="Cari menurut nama"
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
              {dataAdmin?.admin.main === "1" ? (
                <button className="customer-add" onClick={onClickAdd}>
                  + TAMBAH ADMIN
                </button>
              ) : (
                <></>
              )}
            </div>
            <div style={{ height: 300, width: "100%" }}>
              {isFetching ? (
                <CircularProgress color="secondary" />
              ) : (
                <StyledDataGrid
                  rows={(data?.data || []).filter((admin) =>
                    admin.nama.toLowerCase().includes(searchTerm.toLowerCase())
                  )}
                  columns={column}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[5, 10, 15]}
                  style={{ height: "70vh" }}
                  className="card-container"
                  getRowClassName={(params) =>
                    `super-app-theme--${params.row.main}`
                  }
                />
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <Modal opened={opened} centered onClose={close} withCloseButton={false}>
        <AdminForm
          data={currentData}
          onClose={close}
          isEdit={isEdit}
          dataCustomer={isEdit ? [] : data?.data}
        />
      </Modal>
    </div>
  );
};

export default Admin;
