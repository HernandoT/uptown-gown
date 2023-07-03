import "./PopularCollections.css";
import { WiStars } from "react-icons/wi";

const PopularCollections = ({ data }) => {
  const image1 = data.find((collection) => {
    return collection.popular_collection === 1;
  });
  const image2 = data.find((collection) => {
    return collection.popular_collection === 2;
  });
  const image3 = data.find((collection) => {
    return collection.popular_collection === 3;
  });
  const image4 = data.find((collection) => {
    return collection.popular_collection === 4;
  });

  return (
    <div className="popularCollections">
      <div className="popularCollectionsTitle">
        <div className="popularCollectionstrip"></div>
        <div>
          <p>Get Inspired by Our<br/>Most Popular Collections,<br/>Loved by Many</p>
          <p className="popularCollectionsDesc">
            Telusuri koleksi paling populer kami yang mendapat cinta dan apresiasi dari banyak orang. Dengan ragam desain yang menawan dan perhatian terhadap detail, kami menghadirkan pilihan yang sempurna untuk memenuhi kebutuhan Anda.
          </p>
          {/* <WiStars /> */}
        </div>
      </div>
      <div className="popularCollectionsContent">
        <div className="popularCollections1 card-container">
          <img src={image1.gambar} alt="Popular Collection" className="preview-img"/>
        </div>
        <div className="popularCollections2 card-container">
          <img src={image2.gambar} alt="Popular Collection" className="preview-img"/>
        </div>
        <div className="popularCollections3 card-container">
          <img src={image3.gambar} alt="Popular Collection" className="preview-img"/>
        </div>
        <div className="popularCollections4 card-container">
          <img src={image4.gambar} alt="Popular Collection" className="preview-img"/>
        </div>
      </div>
    </div>
  );
};

export default PopularCollections;
