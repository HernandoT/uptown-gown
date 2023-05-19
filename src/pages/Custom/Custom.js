import "./Custom.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import SupportEngine from "../../SupportEngine";

const Custom = () => {
  const isLoged = localStorage.getItem("isLoged");

  return (
    <div className="custom">
      <Navbar />
      <div className="customContent">
        <div className="custom-desc">
          <div className="customBox">
            <div className="customLogo">X</div>
            <div className="customTitle">Custom Rent</div>
            <div className="customText">
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
          </div>
          <div className="customBox">
            <div className="customLogo">X</div>
            <div className="customTitle">Custom Made</div>
            <div className="customText">
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
          </div>
        </div>
        <div className="custom-button">
          <button className="appointment-button">BUAT APPOINTMENT SEKARANG!</button>
          <div>Ingin berdiskusi lebih lanjut? <a href="https://wa.me/+6282167798500" target="_blank"><b>Hubungi melalui Whatsapp</b></a></div>
        </div>
      </div>

      <Footer />
      {isLoged === "true" ? <SupportEngine /> : ""}
    </div>
  );
};

export default Custom;
