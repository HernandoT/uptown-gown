import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import NewCollections from "../../components/NewCollections/NewCollections";
import PopularCollections from "../../components/PopularCollections/PopularCollections";
import Slogan from "../../components/Slogan/Slogan";
import Testimonials from "../../components/Testimonials/Testimonials";
import SupportEngine from "../../SupportEngine";
import "./Home.css";
import { getCollectionsWithOrderedDate } from "../../services/collection";
import { useQuery } from "@tanstack/react-query";
import image from "../../utils/assets/home-image-2.png";

const Home = () => {
  const isLoged = localStorage.getItem("isLoged");

  const { data, isFetching } = useQuery(["get-collections-with-ordered-date"], () =>
    getCollectionsWithOrderedDate()
  );

  return (
    <div className="home">
      <Navbar />
      {isFetching ? (
        <></>
      ) : (
        <>
          <div className="square"></div>
          <Slogan />
          <NewCollections data={data.data} />
          <Banner image={image}/>
          <PopularCollections data={data.data} />
          <Testimonials />
          <Footer />
          {isLoged === "true" ? <SupportEngine /> : ""};
        </>
      )}
    </div>
  );
};

export default Home;
