import "./Slogan.css";
import img from "../../utils/assets/home-image.png";

const Slogan = () => {
  return (
    <div className="slogan">
      <div className="text">
        <h1 className="sloganTitle">Slogan here</h1>
        <h1 className="sloganTitle">Lorem Ipsum</h1>
        <p className="desc">Description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
      </div>

      <div className="slogan-img">
        <img src={img} alt="Slogan Image" className="slogan-image"/>
      </div>
    </div>
  );
};

export default Slogan;
