import "./Footer.css";
import logo from "../../utils/assets/logo.png";
import { FaWhatsapp ,FaEnvelope ,FaInstagram} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerLogo">
        <img src={logo} alt="" />
      </div>
      <div className="footerCompany">
        <p>
          <b>Company</b>
        </p>
        <p>About Us</p>
        <p>FAQ</p>
        <p>Privacy & Policy</p>
        <p>Terms & Condition</p>
      </div>
      <div className="footerSupport">
        <p>
          <b>Support</b>
        </p>
        <p style={{display: "flex", alignItems: "center"}}><FaWhatsapp className="footerIcon"/>+6221 11223344</p>
        <p style={{display: "flex", alignItems: "center"}}><FaEnvelope className="footerIcon"/>lorem@email.com</p>
        <p style={{display: "flex", alignItems: "center"}}><FaInstagram className="footerIcon"/>uptown.gown</p>
      </div>
    </div>
  );
};

export default Footer;
