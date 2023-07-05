import "./Custom.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import SupportEngine from "../../SupportEngine";
import { GiLargeDress, GiSewingMachine } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Custom = () => {
  const isLoged = localStorage.getItem("isLoged");
  const navigate = useNavigate();

  return (
    <div className="custom">
      <Navbar />
      <div className="customContent">
        <div className="custom-desc">
          <div className="customBox card-container">
            <div className="customBoxAccent1"></div>
            <div className="customBoxAccent2"></div>
            <div className="customLogo">
              <GiLargeDress className="customIcon" />
            </div>
            <div className="customTitle">Custom Rent</div>
            <div className="customText">
              <div>
                Custom Rent memungkinkan kamu untuk mendapatkan gaun impian
                kamu. Kamu bisa memilih dari berbagai jenis bahan, model, dan
                ukuran yang sesuai dengan selera dan kebutuhan.
              </div>
              <div>
                Dengan layanan Custom Rent, kamu tidak perlu khawatir tentang
                membeli gaun yang mahal untuk hanya dipakai sekali atau dua
                kali. Kamu bisa menyesuaikan gaun dengan acara yang kamu hadiri
                dan membuat penampilan kamu tampak lebih menarik.
              </div>
            </div>
            <div className="customBoxAccent2"></div>
            <div className="customBoxAccent1"></div>
          </div>
          <div className="customBox card-container">
            <div className="customBoxAccent1"></div>
            <div className="customBoxAccent2"></div>
            <div className="customLogo">
              <GiSewingMachine className="customIcon" />
            </div>
            <div className="customTitle">Custom Made</div>
            <div className="customText">
              <div>
                Ingin memiliki gaun pesta yang benar-benar sesuai dengan selera
                dan kebutuhan kamu? Kamu dapat memilih layanan Custom Made yang
                dapat memberikan kamu gaun pesta impian dengan desain yang unik
                dan hanya untuk kamu.
              </div>
              <div>
                Layanan pembuatan gaun custom made memungkinkan kamu untuk
                mengambil bagian dalam proses desain gaun, mulai dari memilih
                jenis kain, warna, hingga detail kecil seperti hiasan dan
                potongan yang kamu inginkan. Kamu bisa bekerja sama dengan
                desainer untuk menciptakan gaun yang benar-benar unik dan hanya
                untuk kamu.
              </div>
            </div>
            <div className="customBoxAccent2"></div>
            <div className="customBoxAccent1"></div>
          </div>
        </div>
        <div className="custom-button">
          <div style={{ fontSize: "1rem" }}>
            <b>Tertarik untuk membuat gaun custom impian kamu? Ayo kunjungi kami dengan membuat appointment sekarang.</b>
          </div>
          <button
            className="appointment-button"
            onClick={() => {
              navigate("/appointment");
              window.scrollTo(0, 0);
            }}
          >
            BUAT APPOINTMENT SEKARANG!
          </button>
          <div style={{ marginTop: "2rem", fontSize: "1rem" }}>
            Atau ada pertanyaan yang ingin ditanyakan terlebih dahulu?
            <a
              href="https://wa.me/+6282165828164"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "black",
                paddingLeft: "4px",
              }}
            >
              <b>Hubungi kami melalui Whatsapp</b>
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
