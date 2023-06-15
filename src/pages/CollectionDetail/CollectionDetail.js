import { useQuery } from "@tanstack/react-query";
import Navbar from "../../components/Navbar/Navbar";
import { getCollection } from "../../services/collection";
import "./CollectionDetail.css";
import SupportEngine from "../../SupportEngine";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import BackButton from "../../components/BackButton";

const CollectionDetail = () => {
  const isLoged = localStorage.getItem("isLoged");

  const { id } = useParams();
  const { data, isFetching } = useQuery(
    ["get-appointment", id],
    () => getCollection(id || ""),
    { enabled: !!id }
  );

  return (
    <div className="collection-detail">
      <Navbar />
      {isFetching ? (
        <></>
      ) : (
        <>
          <div className="detail-content">
            {/* {JSON.stringify(data)} */}
            <div className="detail-img">
              <img
                src={data.collection.gambar}
                alt="Detail Image"
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
              <button className="detail-button">CEK KETERSEDIAAN</button>
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
