import "./Custom.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import SupportEngine from "../../SupportEngine";
import { GiLargeDress, GiSewingMachine } from "react-icons/gi";

const Custom = () => {
  const isLoged = localStorage.getItem("isLoged");

  return (
    <div className="custom">
      <Navbar />
      <div className="customContent">
        <div className="custom-desc">
          <div className="customBox">
            <div className="customLogo"><GiLargeDress className="customIcon"/></div>
            <div className="customTitle">Custom Rent</div>
            <div className="customText">
              <div>
              Custom Rent memungkinkan kamu untuk mendapatkan gaun impian kamu. Kamu bisa memilih dari berbagai jenis 
              bahan, model, dan ukuran yang sesuai dengan selera dan kebutuhan.
              </div>
              <div>
              Dengan layanan Custom Rent, kamu tidak perlu khawatir tentang membeli gaun yang mahal untuk hanya dipakai 
              sekali atau dua kali. Kamu bisa menyesuaikan gaun dengan acara yang kamu hadiri dan membuat penampilan 
              kamu tampak lebih menarik.
              </div>
            </div>
          </div>
          <div className="customBox">
            <div className="customLogo"><GiSewingMachine className="customIcon"/></div>
            <div className="customTitle">Custom Made</div>
            <div className="customText">
              <div>
              Ingin memiliki gaun pesta yang benar-benar sesuai dengan selera dan kebutuhan kamu? 
              Kamu dapat memilih layanan Custom Made yang dapat memberikan kamu gaun pesta impian 
              dengan desain yang unik dan hanya untuk kamu.
              </div>
              <div>
                Layanan pembuatan gaun custom made memungkinkan kamu untuk mengambil bagian dalam 
                proses desain gaun, mulai dari memilih jenis kain, warna, hingga detail kecil seperti 
                hiasan dan potongan yang kamu inginkan. Kamu bisa bekerja sama dengan desainer untuk 
                menciptakan gaun yang benar-benar unik dan hanya untuk kamu.
              </div>
            </div>
          </div>
        </div>
        <div className="custom-button">
          <button className="appointment-button">BUAT APPOINTMENT SEKARANG!</button>
          <div style={{marginTop: "2rem", fontSize: "1rem"}}>Ingin berdiskusi lebih lanjut? 
            <a href="https://wa.me/+6282167798500" target="_blank" rel="noreferrer" style={{textDecoration: "none", color: "black", paddingLeft: "4px"}}>
              <b>Hubungi melalui Whatsapp</b>
              </a>
            </div>
        </div>
      </div>

      <Footer />
      {isLoged === "true" ? <SupportEngine /> : ""}
    </div>
  );
};

export default Custom;
