import "./Slogan.css";
import img from "../../utils/assets/home-image.png";
import { BsStars } from "react-icons/bs";

const Slogan = () => {
  return (
    <div className="slogan">
      <div className="text">
        <h1 className="sloganTitle">Make Memories <BsStars style={{ color: "EDBF52" }} /></h1>
        <h1 className="sloganTitle">in Your Dream Dress</h1>
        <p className="desc">di Uptown Gown custom dan sewa tidaklah sulit. 
        Kamu tidak perlu repot memikirkan design atau bahan yang kamu mau karna disini kami mengatur semuanya. 
        Kami juga bisa merancang gaun pesta, sweet seventeen, cheongsam dan juga gaun pengantin sesuai dengan selera anda dengan harga yang terjangkau dan kualitas yang bagus. 
        </p>
      </div>

      <div className="slogan-img">
        <img src={img} alt="Slogan Image" className="slogan-image"/>
      </div>
    </div>
  );
};

export default Slogan;
