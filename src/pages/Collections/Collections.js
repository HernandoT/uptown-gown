import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./Collections.css";
import * as React from "react";
import { TextField, InputAdornment, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import DetailButton from "../../components/DetailButton";
import CollectionForm from "./CollectionForm";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getCollections } from "../../services/collection";
import { useQuery } from "@tanstack/react-query";
import { getColors } from "../../services/color";
import { getCategories } from "../../services/category";
import { getTypes } from "../../services/type";
import { TbHanger } from "react-icons/tb";
import { CgUnavailable, CgCheckO } from "react-icons/cg";
import { getDetailInvoiceItems } from "../../services/detail-invoice-item";
import { getSizes } from "../../services/size";

const defaultValues = {
  id: "",
  nama: "",
  id_warna: "",
  id_kategori: "",
  id_jenis: "",
  harga: 0,
  deskripsi: "",
  status: "",
  gambar: "",
  popular_collection: 0,
};
const Collections = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentData, setCurrentData] = React.useState(defaultValues);
  const [isEdit, setIsEdit] = React.useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [totalCollection, setTotalCollection] = React.useState(0);
  const [availableCollection, setAvailableCollection] = React.useState(0);
  const [unavailableCollection, setUnavailableCollection] = React.useState(0);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const { data, isFetching } = useQuery(["get-collections"], () =>
    getCollections()
  );

  const { data: dataColors, isFetching: isFetchingColors } = useQuery(
    ["get-colors"],
    () => getColors()
  );

  const { data: dataCategories, isFetching: isFetchingCategories } = useQuery(
    ["get-categories"],
    () => getCategories()
  );

  const { data: dataTypes, isFetching: isFetchingTypes } = useQuery(
    ["get-types"],
    () => getTypes()
  );

  const { data: dataSizes, isFetching: isFetchingSizes } = useQuery(
    ["get-sizes"],
    () => getSizes()
  );

  const { data: dataDetailItems, isFetching: isFetchingDetailItems } = useQuery(
    ["get-detail-invoice-items"],
    () => getDetailInvoiceItems()
  );

  const collections = React.useMemo(() => {
    if (
      !isFetching &&
      !isFetchingCategories &&
      !isFetchingColors &&
      !isFetchingTypes &&
      !isFetchingSizes &&
      !isFetchingDetailItems
    ) {
      let dataCollection = data?.data;
      let availableCollection = 0;
      let unavailableCollection = 0;
      dataCollection.sort((a, b) =>
        a.nama.toLowerCase() > b.nama.toLowerCase() ? 1 : -1
      );
      const _collections = dataCollection.map((collection) => {
        if (collection.status === "Available") availableCollection += 1;
        if (collection.status === "Unavailable") unavailableCollection += 1;
        const color = dataColors.data.find((color) => {
          return color.id === collection.id_warna;
        });
        const category = dataCategories.data.find((category) => {
          return category.id === collection.id_kategori;
        });
        const type = dataTypes.data.find((type) => {
          return type.id === collection.id_jenis;
        });
        const size = dataSizes.data.find((size) => {
          return size.id === collection.id_ukuran;
        });
        collection.warna = color.nama_warna;
        collection.kategori = category.nama_kategori;
        collection.jenis = type.nama_jenis;
        collection.ukuran = size.nama_ukuran;
        collection.jumlah_tersewa = dataDetailItems?.data.filter(
          (detailItem) => detailItem.id_collection === collection.id
        ).length;
        return collection;
      });
      setTotalCollection(_collections.length);
      setAvailableCollection(availableCollection);
      setUnavailableCollection(unavailableCollection);
      return _collections;
    }
  }, [
    isFetching,
    isFetchingCategories,
    isFetchingColors,
    isFetchingTypes,
    isFetchingDetailItems,
    data?.data,
    dataDetailItems?.data,
    dataColors?.data,
    dataCategories?.data,
    dataTypes?.data,
  ]);

  const columns = [
    { field: "nama", headerName: "Nama", minWidth: 150, flex: 2 },
    {
      field: "harga",
      headerName: "Harga",
      minWidth: 100,
      flex: 1,
      renderCell: ({ row }) => {
        function currencyFormat(num) {
          return (
            "Rp. " + num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
          );
        }
        return <>{currencyFormat(row.harga)}</>;
      },
    },
    { field: "warna", headerName: "Warna", minWidth: 75, flex: 1 },
    { field: "kategori", headerName: "Kategori", minWidth: 75, flex: 1 },
    { field: "jenis", headerName: "Jenis", minWidth: 75, flex: 1 },
    { field: "ukuran", headerName: "Ukuran", minWidth: 75, flex: 1 },
    { field: "deskripsi", headerName: "Deskripsi", minWidth: 150, flex: 2 },
    { field: "status", headerName: "Status", minWidth: 75, flex: 1 },
    {
      field: "jumlah_tersewa",
      headerName: "Tersewakan",
      minWidth: 75,
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
            {row.jumlah_tersewa}x
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 75,
      flex: 0.5,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      renderCell: ({ row }) => {
        const onClick = () => {
          setCurrentData({
            id: row.id,
            nama: row.nama,
            harga: row.harga,
            id_warna: row.id_warna,
            id_kategori: row.id_kategori,
            id_jenis: row.id_jenis,
            id_ukuran: row.id_ukuran,
            deskripsi: row.deskripsi,
            status: row.status,
            gambar: row.gambar,
            popular_collection: row.popular_collection,
            created_at: row.created_at,
          });
          open();
          setIsEdit(true);
        };
        return <DetailButton onClick={onClick} />;
      },
    },
  ];

  const onClickAdd = React.useCallback(() => {
    setCurrentData(defaultValues);
    setIsEdit(false);
    open();
  }, [open]);

  return (
    <div className="collections">
      <AdminTitle props={"All Collections"} />
      <div className="collections-content">
        <div className="collections-card">
          <div
            className="card-container"
            style={{ backgroundColor: "rgba(237, 191, 82, 0.2)" }}
          >
            <TbHanger
              className="collections-card-icon"
              style={{ color: "#EDBF52" }}
            />
            <div style={{ flex: 1, zIndex: 2 }}>
              <div>Total Collections</div>
              <div className="collections-card-value">{totalCollection}</div>
            </div>
          </div>
          <div
            className="card-container"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)" }}
          >
            <CgCheckO
              className="collections-card-icon"
              style={{ color: "green" }}
            />
            <div style={{ flex: 1, zIndex: 2 }}>
              <div>Available Collection</div>
              <div className="collections-card-value">
                {availableCollection}
              </div>
            </div>
          </div>
          <div
            className="card-container"
            style={{ backgroundColor: "rgba(255, 0, 0, 0.2)" }}
          >
            <CgUnavailable
              className="collections-card-icon"
              style={{ color: "red" }}
            />
            <div style={{ flex: 1, zIndex: 2 }}>
              <div>Unavailable Collection</div>
              <div className="collections-card-value">
                {unavailableCollection}
              </div>
            </div>
          </div>
        </div>
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
            style={{ backgroundColor: "white" }}
          />
          <button className="collections-add" onClick={onClickAdd}>
            + TAMBAH BARANG
          </button>
        </div>
        <div style={{ height: 300, width: "100%" }}>
          {collections === undefined ? (
            <CircularProgress color="secondary" />
          ) : (
            <DataGrid
              rows={collections.filter((collection) =>
                collection.nama.toLowerCase().includes(searchTerm.toLowerCase())
              )}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 15]}
              style={{ height: "58vh" }}
              className="card-container"
            />
          )}
        </div>
      </div>
      <Modal
        opened={opened}
        centered
        onClose={close}
        withCloseButton={false}
        size={1200}
      >
        <CollectionForm onClose={close} data={currentData} isEdit={isEdit} />
      </Modal>
    </div>
  );
};

export default Collections;
