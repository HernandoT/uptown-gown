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
              <div style={{ width: "90%" }}>{collection.deskripsi}</div>
              <div>Warna: {collection.warna}</div>
              <div>Kategori: {collection.kategori}</div>
              <div>Jenis: {collection.jenis}</div>
              <button
                className="detail-button"
                onClick={openCalendar({ listEventDate })}
              >
                CEK KETERSEDIAAN
              </button>
              <button
                className="detail-button"
                onClick={() => navigate("/appointment", { state: collection })}
              >
                BUAT APPOINTMENT
              </button>
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
