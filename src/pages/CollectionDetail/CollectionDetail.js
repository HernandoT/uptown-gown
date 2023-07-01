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

  React.useEffect(() => {
    if (
      !isFetching &&
      !isFetchingCategories &&
      !isFetchingColors &&
      !isFetchingTypes &&
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
      dataCollection.warna = color.nama_warna;
      dataCollection.kategori = category.nama_kategori;
      dataCollection.jenis = type.nama_jenis;
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

  return (
    <div className="collection-detail">
      <Navbar />
      {!isInitiate ? (
        <></>
      ) : (
        <>
          <div className="detail-content">
            <div className="detail-img card-container">
              <img
                src={collection.gambar}
                alt="Detail"
                className="detail-image"
              />
            </div>
            <div className="detail-description card-container">
              <BackButton />
              <div className="detail-name">
                <div className="detail-strip" />
                <p>{collection.nama}</p>
              </div>
              <div className="detail-harga">
                {currencyFormat(collection.harga)}
              </div>
              <Divider />
              <div style={{ width: "90%", marginTop: "16px" }}>
                {collection.deskripsi}
              </div>
              <Separator _gap={16} />
              <div>Warna: {collection.warna}</div>
              <div>Kategori: {collection.kategori}</div>
              <div>Jenis: {collection.jenis}</div>
              <div className="detail-buttons">
                <div className="detail-left">
                  <button
                    className="detail-button-calendar"
                    onClick={openCalendar({ listEventDate })}
                  >
                    CEK KETERSEDIAAN
                  </button>
                </div>
                <div className="detail-right">
                  <div style={{ marginBottom: "8px" }}>
                    Berminat untuk menyewa koleksi ini?
                    <br />
                    Buat appointment untuk koleksi ini sekarang agar kami dapat
                    mempersiapkannya saat kehadiran anda.
                  </div>
                  <button
                    className="detail-button-appointment"
                    onClick={() =>
                      navigate("/appointment", { state: collection })
                    }
                  >
                    BUAT APPOINTMENT
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
          {isLoged === "true" ? <SupportEngine /> : ""};
        </>
      )}
    </div>
  );
};

export default CollectionDetail;
