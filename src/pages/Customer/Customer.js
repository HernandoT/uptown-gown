import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./Customer.css";
import {
  TextField,
  InputAdornment,
  CircularProgress,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";

import * as React from "react";
import { useDisclosure } from "@mantine/hooks";
import CustomerForm from "./CustomerForm";
import { getCustomers } from "../../services/customer";
import { useQuery } from "@tanstack/react-query";
import { deleteEntity } from "../../services/firebase";
import { field } from "../../common/constant";
import { queryClient } from "../../services/query-client";
import { Flex, Text, Paper, Modal } from "@mantine/core";
import Separator from "../../components/separator";

const defaultValues = {
  email: "",
  name: "",
  password: "123456",
  phoneNumber: "",
};

const Customer = () => {
  // const [customer, setCustomer] = React.useState([]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [openDeleteDialog, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [currentData, setCurrentData] = React.useState(defaultValues);
  const [isEdit, setIsEdit] = React.useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const { data, isFetching } = useQuery(["get-customers"], () =>
    getCustomers()
  );

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
      headerName: "",
      sortable: false,
      renderCell: ({ row }) => {
        const onClick = () => {
          setCurrentData({
            email: row.email,
            name: row.nama,
            password: row.password,
            phoneNumber: row.nomor_telepon,
            id: row.id,
          });
          open();
          setIsEdit(true);
        };
        return (
          <>
            <Button onClick={onClick}>Edit</Button>
          </>
        );
      },
    },

    {
      field: "delete",
      headerName: "",
      sortable: false,
      renderCell: ({ row }) => {
        const onDelete = () => {
          deleteEntity({ id: row.id, entity: field.customer });
          queryClient.refetchQueries(["get-customers"]);
          closeDelete();
        };
        return (
          <>
            <Button onClick={openDelete}>Delete</Button>
            <Modal onClose={closeDelete} open={openDeleteDialog}>
              <Paper
                p={24}
                miw={400}
                style={{
                  transform: "translate(-50%, -50%)",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                }}
              >
                <Text>
                  Are you sure delete customer "
                  {[row.nama, row.nomor_telepon].join(" - ")}"
                </Text>
                <Separator _gap={36} />
                <Flex direction="row" justify="flex-end">
                  <Button color="error" onClick={closeDelete}>
                    No
                  </Button>
                  <Button onClick={onDelete}>Yes</Button>
                </Flex>
              </Paper>
            </Modal>
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
          <button className="customer-add" onClick={onClickAdd}>
            + TAMBAH CUSTOMER
          </button>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          {isFetching ? (
            <CircularProgress color="secondary" />
          ) : (
            <DataGrid
              rows={(data?.data || []).filter((customer) =>
                customer.nama.toLowerCase().includes(searchTerm.toLowerCase())
              )}
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
      <Modal opened={opened} centered onClose={close} withCloseButton={false}>
        <CustomerForm data={currentData} onClose={close} isEdit={isEdit} />
      </Modal>
    </div>
  );
};

export default Customer;
