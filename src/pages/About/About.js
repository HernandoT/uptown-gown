import Banner from "../../components/Banner/Banner";
import "./About.css";
import logo from "../../utils/assets/logo.png";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import SupportEngine from "../../SupportEngine";

const About = () => {
  const isLoged = localStorage.getItem("isLoged");

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
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.986671869443!2d98.63903637483689!3d3.590531396383605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312f4bb66d1b39%3A0x9bc4d57f13ef496a!2sUpTownGown!5e0!3m2!1sen!2sid!4v1683898314236!5m2!1sen!2sid" width="100%" height="600" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      <Footer />
      {isLoged === "true" ? <SupportEngine /> : ""}
    </div>
  );
};

export default About;
