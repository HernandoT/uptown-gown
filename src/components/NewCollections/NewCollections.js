import "./NewCollections.css";
import { useState } from "react";
import Carousel from "react-simply-carousel";

const NewCollections = ({ data }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const availableCollection = data.filter((collection) => {
    return collection.status === "Available";
  });

  return (
    <div className="newCollections">
      <div className="newCollectionsTitle">
        <div className="newCollectionStrip"></div>
        <p>New Collections</p>
      </div>
      <Carousel
        autoplay={true}
        autoplayDelay={3000}
        containerProps={{
          style: {
            width: "100%",
            justifyContent: "space-between",
            userSelect: "text",
          },
        }}
        activeSlideIndex={activeSlide}
        activeSlideProps={{}}
        onRequestChange={setActiveSlide}
        forwardBtnProps={{
          children: ">",
          style: {
            width: 60,
            height: 60,
            minWidth: 60,
            alignSelf: "center",
            display: "none",
          },
        }}
        backwardBtnProps={{
          children: "<",
          style: {
            width: 60,
            height: 60,
            minWidth: 60,
            alignSelf: "center",
            display: "none",
          },
        }}
        dotsNav={{
          show: true,
          itemBtnProps: {
            style: {
              height: 16,
              width: 16,
              borderRadius: "50%",
              border: 0,
              margin: "5px",
            },
          },
          activeItemBtnProps: {
            style: {
              height: 16,
              width: 16,
              borderRadius: "50%",
              background: "black",
              margin: "5px",
            },
          },
        }}
        itemsToShow={4}
        speed={400}
      >
        {availableCollection.slice(0, 8).map((collection, index) => (
          <div
            style={{
              width: "25vw",
              height: "25vw",
              padding: 15,
              textAlign: "center",
              boxSizing: "border-box",
            }}
            key={index}
          >
            <img
              src={collection.gambar}
              alt="New Collection"
              className="new-img"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default NewCollections;
