import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import NewCollections from "../../components/NewCollections/NewCollections";
import PopularCollections from "../../components/PopularCollections/PopularCollections";
import Slogan from "../../components/Slogan/Slogan";
import Testimonials from "../../components/Testimonials/Testimonials";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="square"></div>
      <Slogan />
      <NewCollections />
      <Banner />
      <PopularCollections />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
