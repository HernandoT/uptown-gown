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

const CollectionDetail = () => {
  const isLoged = localStorage.getItem("isLoged");
  const navigate = useNavigate();

  const { id } = useParams();
  const { data, isFetching } = useQuery(
    ["get-appointment", id],
    () => getCollection(id || ""),
    { enabled: !!id }
  );

  const { listEventDate } = useGetEventDate(id);

  console.log(data?.collection)
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
      {isFetching ? (
        <></>
      ) : (
        <>
          <div className="detail-content">
            <div className="detail-img">
              <img
                src={data.collection.gambar}
                alt="Detail"
                className="detail-image"
              />
            </div>
            <div className="detail-description">
              <BackButton />
              <div className="detail-name">
                <div className="detail-strip" />
                <p>{data.collection.nama}</p>
              </div>
              <div style={{ width: "90%" }}>{data.collection.deskripsi}</div>
              <div>Warna: {data.collection.id_warna}</div>
              <button
                className="detail-button"
                onClick={openCalendar({ listEventDate })}
              >
                CEK KETERSEDIAAN
              </button>
              <button
                className="detail-button"
                onClick={() => navigate('/appointment')}
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
