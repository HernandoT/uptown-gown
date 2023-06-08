import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./Collections.css";
import * as React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import DetailButton from "../../components/DetailButton";
import CollectionForm from "./CollectionForm";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { getCollections } from "../../services/collection";

const Collections = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const { data } = useQuery(["get-collections"], () => getCollections());

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const columns = [
    { field: "nama", headerName: "Nama", minWidth: 200, flex: 1 },
    { field: "id_warna", headerName: "Warna", minWidth: 100, flex: 1 },
    { field: "id_kategori", headerName: "Kategori", minWidth: 100, flex: 1 },
    { field: "id_jenis", headerName: "Jenis", minWidth: 100, flex: 1 },
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

  const onClickAdd = React.useCallback(() => {
    // setCurrentData(defaultValues);
    // setIsEdit(false);
    open();
  }, [open]);

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
          <button className="collections-add" onClick={onClickAdd}>
            + TAMBAH BARANG
          </button>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data?.data || []}
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
      <Modal
        opened={opened}
        centered
        onClose={close}
        withCloseButton={false}
        size={1200}
      >
        <CollectionForm onClose={close} />
      </Modal>
    </div>
  );
};

export default Collections;
