import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./Expense.css";
import * as React from "react";
import { TextField, InputAdornment, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { getExpenses } from "../../services/expense";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import ExpenseForm from "./ExpenseForm";
import dayjs from "dayjs";

const defaultValues = {
  tanggal: new Date(),
  nominal: 0,
  keterangan: "",
};

const Expense = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [currentData, setCurrentData] = React.useState(defaultValues);
  const [isEdit, setIsEdit] = React.useState(false);

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
    {
      field: "tanggal",
      headerName: "Tanggal",
      minWidth: 200,
      flex: 1,
      renderCell: ({ row }) => {
        return <>{dayjs(row.tanggal).format("DD/MM/YYYY")}</>;
      },
    },
    {
      field: "nominal",
      headerName: "Nominal",
      minWidth: 200,
      flex: 1,
      renderCell: ({ row }) => {
        function currencyFormat(num) {
          return "Rp. " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }
        return <>{currencyFormat(row.nominal)}</>;
      },
    },
    { field: "keterangan", headerName: "Keterangan", minWidth: 400, flex: 3 },
    {
      field: "action",
      headerName: "Action",
      minWidth: 50,
      flex: 0.5,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      renderCell: ({ row }) => {
        const onClick = () => {
          setCurrentData({
            tanggal: row.tanggal,
            nominal: row.nominal,
            keterangan: row.keterangan,
            id: row.id,
          });
          open();
          setIsEdit(true);
        };
        return (
          <div onClick={onClick} style={{display: "flex", justifyContent: "center", width: "100%"}}>
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </div>
        );
      },
    },
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
          <ExpenseForm data={currentData} onClose={close} isEdit={isEdit} />
        </Modal>
      </div>
    </div>
  );
};

export default Expense;
