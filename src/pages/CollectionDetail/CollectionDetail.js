import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../../components/Navbar/Navbar";
import { getCollection } from "../../services/collection";
import "./CollectionDetail.css";
import SupportEngine from "../../SupportEngine";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import BackButton from "../../components/BackButton";
import { modals } from "@mantine/modals";
import useGetEventDate from "../../hooks/use-get-event-date";
import Calendar from "../../components/Calendar/Calendar";
import { getColors } from "../../services/color";
import { getCategories } from "../../services/category";
import { getTypes } from "../../services/type";
import Separator from "../../components/separator";
import Divider from "@mui/material/Divider";
import { notifications } from "@mantine/notifications";
import { getSizes } from "../../services/size";

const CollectionDetail = () => {
  const isLoged = localStorage.getItem("isLoged");
  const navigate = useNavigate();
  const [isInitiate, setIsInitiate] = React.useState(false);
  const [collection, setCollection] = React.useState([]);

  const { id } = useParams();
  const { data, isFetching } = useQuery(
    ["get-appointment", id],
    () => getCollection(id || ""),
    { enabled: !!id }
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

  React.useEffect(() => {
    if (
      !isFetching &&
      !isFetchingCategories &&
      !isFetchingColors &&
      !isFetchingTypes &&
      !isFetchingSizes &&
      !isInitiate
    ) {
      let dataCollection = data?.collection;
      const color = dataColors.data.find((color) => {
        return color.id === dataCollection.id_warna;
      });
      const category = dataCategories.data.find((category) => {
        return category.id === dataCollection.id_kategori;
      });
      const type = dataTypes.data.find((type) => {
        return type.id === dataCollection.id_jenis;
      });
      const size = dataSizes.data.find((size) => {
        return size.id === dataCollection.id_ukuran;
      });
      dataCollection.warna = color.nama_warna;
      dataCollection.kategori = category.nama_kategori;
      dataCollection.jenis = type.nama_jenis;
      dataCollection.ukuran = size.nama_ukuran;
      dataCollection.id = id;
      setIsInitiate(true);
      setCollection(dataCollection);
    }
  }, [
    isFetching,
    isFetchingCategories,
    isFetchingColors,
    isFetchingTypes,
    isInitiate,
    data?.collection,
    dataColors?.data,
    dataCategories?.data,
    dataTypes?.data,
    isFetchingSizes,
    dataSizes?.data,
    id,
  ]);

  const { listEventDate } = useGetEventDate(id);

  const openCalendar =
    ({ listEventDate }) =>
    () => {
      const disableDate = listEventDate.map((date) => {
        return new Date(date);
      });
      modals.open({
        size: 500,
        centered: true,
        withCloseButton: false,
        children: <Calendar disableDate={disableDate} />,
      });
    };

  function currencyFormat(num) {
    return "Rp. " + num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  // Function to add an item to session storage
  function addItemToStorage(item) {
    // Retrieve existing items from session storage
    let items = JSON.parse(sessionStorage.getItem("items")) || [];

    // Check if the maximum limit of 5 items has been reached
    if (items.length >= 5) {
      notifications.show({
        title: "Tambah Koleksi Diinginkan",
        message: "Koleksi yang dipilih telah mencapai batas",
        color: "red",
      });
      return;
    }

    if (items.find((existingItem) => existingItem.id === item.id)) {
      notifications.show({
        title: "Tambah Koleksi Diinginkan",
        message: "Koleksi ini sudah ada dalam daftar",
        color: "red",
      });
      return;
    }

    // Add the new item to the array
    items.push(item);

    // Store the updated array back to session storage
    sessionStorage.setItem("items", JSON.stringify(items));

    navigate("/appointment");
  }

  return (
    <div className="collection-detail">
      <Navbar />
      {!isInitiate ? (
        <></>
      ) : (
        <>
          <div style={{ marginLeft: "5%", marginBottom: 0, width:"fit-content"}}>
            <BackButton />
          </div>
          <div className="detail-content">
            <div className="detail-img card-container">
              <img
                src={collection.gambar}
                alt="Detail"
                className="detail-image"
              />
            </div>
            <div className="detail-description card-container">
              <div className="detail-name">
                <div className="detail-strip" />
                <p>{collection.nama}</p>
              </div>
              <div className="detail-harga">
                {currencyFormat(collection.harga)}
              </div>
              <Divider />
              <div className="detail-keterangan">
                {collection.deskripsi}
              </div>
              <Separator _gap={16} />
              <div>Warna: {collection.warna}</div>
              <div>Kategori: {collection.kategori}</div>
              <div>Jenis: {collection.jenis}</div>
              <div>Ukuran: {collection.ukuran}</div>
            </div>
            <div className="card-container detail-buttons">
              <div style={{ margin: "0 0 8px" }}>
                <b>
                  Ingin tahu apakah koleksi ini tersedia untuk tanggal acara
                  anda?
                </b>
              </div>
              Periksa ketersediaan koleksi dengan klik tombol dibawah ini.
              <button
                className="detail-button-calendar"
                onClick={openCalendar({ listEventDate })}
              >
                CEK KETERSEDIAAN
              </button>
              <Divider />
              <div style={{ margin: "16px 0 8px" }}>
                <b>Berminat untuk menyewa koleksi ini?</b>
              </div>
              Buat appointment untuk koleksi ini sekarang agar kami dapat
              mempersiapkannya saat kehadiran anda.
              <button
                className="detail-button-appointment"
                onClick={() => addItemToStorage(collection)}
              >
                BUAT APPOINTMENT
              </button>
            </div>
          </div>
          <Footer />
          {isLoged === "true" ? <SupportEngine /> : ""}
        </>
      )}
    </div>
  );
};

export default CollectionDetail;
