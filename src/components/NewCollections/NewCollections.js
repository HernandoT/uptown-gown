import "./NewCollections.css";
import { useState } from "react";
import Carousel from "react-simply-carousel";

const NewCollections = () => {
  const [activeSlide, setActiveSlide] = useState(0);

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
        activeSlideProps={{
          style: {
            background: "blue",
          },
        }}
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
        itemsToShow={5}
        speed={400}
      >
        {Array.from({ length: 10 }).map((item, index) => (
          <div
            style={{
              background: "yellow",
              width: "20vw",
              height: "20vw",
              border: "20px solid white",
              textAlign: "center",
              boxSizing: "border-box",
            }}
            key={index}
          >
            {index}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default NewCollections;
