import "./NewCollections.css";
import { useState } from "react";
import Carousel from "react-simply-carousel";
import { PiShootingStarFill } from "react-icons/pi";

const NewCollections = ({ data }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const availableCollection = data.filter((collection) => {
    return collection.status === "Available";
  });

  return (
    <div className="newCollections">
      <div style={{display:"flex", marginBottom:"32px"}}>
        <div className="newCollectionStrip"></div>
        <div className="newCollectionsTitle">
          <p>Explore Our Fresh</p>
          <p>New Collections<PiShootingStarFill/></p>
        </div>
        <div className="newCollectionsDesc">
        Jelajahi koleksi terbaru kami sekarang dan temukan gaun yang memikat hati Anda. Jadilah yang pertama untuk tampil dengan gaya terbaru dan menjadi pusat perhatian dalam setiap acara yang Anda hadiri.
        </div>
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
              margin: "32px 4px 0",
              backgroundColor: "rgba(237, 191, 82, 0.4)",
            },
          },
          activeItemBtnProps: {
            style: {
              height: 16,
              width: 16,
              borderRadius: "50%",
              border: 0,
              margin: "32px 4px 0",
              backgroundColor: "#EDBF52",
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
