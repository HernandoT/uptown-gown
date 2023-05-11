import Banner from "../../components/Banner/Banner";
import "./About.css";
import logo from "../../utils/assets/logo.png";
import map from "../../utils/assets/map.png"
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const About = () => {
  return (
    <div className="about">
      <Navbar />
      <Banner />
      <div className="aboutContent">
        <img src={logo} alt="" className="aboutLogo" />
        <div className="aboutText">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere
            urna nec tincidunt praesent. Mauris nunc congue nisi vitae. Viverra
            tellus in hac habitasse. Curabitur vitae nunc sed velit dignissim.
            Suspendisse potenti nullam ac tortor vitae purus faucibus ornare.
          </p>
          <p>
            Viverra ipsum nunc aliquet bibendum enim facilisis gravida. Sed
            faucibus turpis in eu mi bibendum neque egestas congue. Quis blandit
            turpis cursus in hac habitasse platea. Porttitor massa id neque
            aliquam vestibulum morbi blandit cursus risus. Sed risus pretium
            quam vulputate dignissim suspendisse in est. A erat nam at lectus
            urna duis convallis convallis. Facilisis mauris sit amet massa
            vitae. Cras semper auctor neque vitae tempus quam pellentesque nec.
          </p>
          <p>
            Orci nulla pellentesque dignissim enim sit amet venenatis urna
            cursus. Fames ac turpis egestas maecenas pharetra convallis posuere.
            Quis eleifend quam adipiscing vitae proin sagittis.
          </p>
        </div>
      </div>
      <img src={map} alt="" className="aboutMap" />
      <Footer />
    </div>
  );
};

export default About;
