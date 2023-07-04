import "./Footer.css";
import logo from "../../utils/assets/logo.png";
import { FaTiktok ,FaRegEnvelope ,FaInstagram} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerLogo">
        <img src={logo} alt="" />
      </div>
      <div className="footerCompany">
        <p>Jl. Gatot Subroto Komplek Taman</p>
        <p>Tomang Elok Blok C No.123</p>
        <p>Kota Medan, Sumatera Utara</p>
        <p>+6282165828164</p>
      </div>
      <div className="footerSupport">
        <a href="mailto:uptowngownn@gmail.com" target="_blank" rel="noopener noreferrer"><p><FaRegEnvelope className="footerIcon"/>uptowngownn@gmail.com</p></a>
        <a href="https://instagram.com/uptown.gown" target="_blank" rel="noopener noreferrer"><p><FaInstagram className="footerIcon"/>uptown.gown</p></a>
        <a href="https://tiktok.com/@uptown.gown" target="_blank" rel="noopener noreferrer"><p><FaTiktok className="footerIcon"/>uptown.gown</p></a>
      </div>
    </div>
  );
};

export default Footer;
