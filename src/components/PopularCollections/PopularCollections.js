import * as React from "react";
import "./PopularCollections.css";
import { WiStars } from "react-icons/wi";
import { useQuery } from "@tanstack/react-query";
import { getCollection } from "../../services/collection";
import { useNavigate } from "react-router-dom";

const PopularCollections = ({ data }) => {
  const navigate = useNavigate();
  const [isInitiate, setIsInitiate] = React.useState(false);
  const { data: collection1, isFetching: isFetching1 } = useQuery(
    ["get-collections-1"],
    () => getCollection(data[0][0])
  );
  const { data: collection2, isFetching: isFetching2 } = useQuery(
    ["get-collections-2"],
    () => getCollection(data[1][0])
  );
  const { data: collection3, isFetching: isFetching3 } = useQuery(
    ["get-collections-3"],
    () => getCollection(data[2][0])
  );
  const { data: collection4, isFetching: isFetching4 } = useQuery(
    ["get-collections-4"],
    () => getCollection(data[3][0])
  );

  React.useEffect(() => {
    if (!isFetching1 && !isFetching2 && !isFetching3 && !isFetching4) {
      setIsInitiate(true);
    }
  }, [isFetching1, isFetching2, isFetching3, isFetching4]);
  // const image1 = data.find((collection) => {
  //   return collection.popular_collection === 1;
  // });
  // const image2 = data.find((collection) => {
  //   return collection.popular_collection === 2;
  // });
  // const image3 = data.find((collection) => {
  //   return collection.popular_collection === 3;
  // });
  // const image4 = data.find((collection) => {
  //   return collection.popular_collection === 4;
  // });

  return (
    <div className="popularCollections">
      <div className="popularCollectionsTitle">
        <div className="popularCollectionstrip" />
        <div className="popularCollectionTitleDesc">
          <p>
            Get Inspired by Our
            <br />
            Most Popular Collections,
            <br />
            Loved by Many
          </p>
          <p className="popularCollectionsDesc">
            Telusuri koleksi paling populer kami yang mendapat cinta dan
            apresiasi dari banyak orang. Dengan ragam desain yang menawan dan
            perhatian terhadap detail, kami menghadirkan pilihan yang sempurna
            untuk memenuhi kebutuhan Anda.
          </p>
          <WiStars />
        </div>
      </div>
      {isInitiate ? (
        <div className="popularCollectionsContent">
          <div className="popularCollections1 card-container">
            <img
              src={collection1?.collection.gambar}
              alt="Popular Collection"
              className="preview-img"
            />
          </div>
          <div className="popularCollections2 card-container">
            <img
              src={collection2?.collection.gambar}
              alt="Popular Collection"
              className="preview-img"
            />
          </div>
          <div className="popularCollections3 card-container">
            <img
              src={collection3?.collection.gambar}
              alt="Popular Collection"
              className="preview-img"
            />
          </div>
          <div className="popularCollections4 card-container">
            <img
              src={collection4?.collection.gambar}
              alt="Popular Collection"
              className="preview-img"
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PopularCollections;
