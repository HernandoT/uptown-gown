import "./PopularCollections.css";

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
        <p>Popular Collections</p>
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
