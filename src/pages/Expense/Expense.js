import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./Expense.css";
import * as React from "react";
import { TextField, InputAdornment, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { getExpenses } from "../../services/expense";
import { useDisclosure } from "@mantine/hooks";
import { Flex, Text, Paper, Modal } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import CustomerForm from "../Customer/CustomerForm";

const defaultValues = {
  date: "",
  nominal: 0,
  description: "",
};

const Expense = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentData, setCurrentData] = React.useState(defaultValues);
  const [isEdit, setIsEdit] = React.useState(false);

  const [opened, { open, close }] = useDisclosure(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const { data, isFetching } = useQuery(["get-expenses"], () => getExpenses());

  const onClickAdd = React.useCallback(() => {
    setCurrentData(defaultValues);
    setIsEdit(false);
    open();
  }, [open]);

  const columns = [
    { field: "tanggal", headerName: "Tanggal", minWidth: 200, flex: 1 },
    { field: "nominal", headerName: "Nominal", minWidth: 200, flex: 1 },
    { field: "keterangan", headerName: "Keterangan", minWidth: 600, flex: 3 },
    {
      field: "action",
      headerName: "Action",
      minWidth: 50,
      flex: 0.5,
      renderCell: ({ row }) => {
        const onClick = () => {
          setCurrentData({
            date: row.tanggal,
            nominal: row.nominal,
            description: row.keterangan,
            id: row.id,
          });
          open();
          setIsEdit(true);
        };
        return (
          <i class="fa fa-pencil" aria-hidden="true" onClick={onClick}></i>
        );
      },
    },
  ];

  // const rows = [
  //   {
  //     id: 1,
  //     tanggal: "01/03/2023",
  //     nominal: "Rp. 500.000",
  //     keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000",
  //   },
  //   {
  //     id: 2,
  //     tanggal: "01/03/2023",
  //     nominal: "Rp. 500.000",
  //     keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000",
  //   },
  //   {
  //     id: 3,
  //     tanggal: "01/03/2023",
  //     nominal: "Rp. 500.000",
  //     keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000",
  //   },
  //   {
  //     id: 4,
  //     tanggal: "01/03/2023",
  //     nominal: "Rp. 500.000",
  //     keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000",
  //   },
  //   {
  //     id: 5,
  //     tanggal: "01/03/2023",
  //     nominal: "Rp. 500.000",
  //     keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000",
  //   },
  //   {
  //     id: 6,
  //     tanggal: "01/03/2023",
  //     nominal: "Rp. 500.000",
  //     keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000",
  //   },
  //   {
  //     id: 7,
  //     tanggal: "01/03/2023",
  //     nominal: "Rp. 500.000",
  //     keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000",
  //   },
  //   {
  //     id: 8,
  //     tanggal: "01/03/2023",
  //     nominal: "Rp. 500.000",
  //     keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000",
  //   },
  //   {
  //     id: 9,
  //     tanggal: "01/03/2023",
  //     nominal: "Rp. 500.000",
  //     keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000",
  //   },
  // ];

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
          <button className="expense-add" onClick={onClickAdd}>
            + TAMBAH PENGELUARAN
          </button>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          {isFetching ? (
            <CircularProgress color="secondary" />
          ) : (
            <DataGrid
              rows={(data?.data || []).filter((expense) =>
                expense.keterangan
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
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
        <Modal opened={opened} centered onClose={close} withCloseButton={false}>
          <CustomerForm data={currentData} onClose={close} isEdit={isEdit} />
        </Modal>
      </div>
    </div>
  );
};

export default Expense;
