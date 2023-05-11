import "./Slogan.css";
import img from "../../utils/assets/logo.png";

const Slogan = () => {
  return (
    <div className="slogan">
      <div className="text">
        <h1 className="sloganTitle">Slogan here</h1>
        <h1 className="sloganTitle">Lorem Ipsum</h1>
        <p className="desc">Description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
      </div>

      <img src={img} alt="" className="img" />
    </div>
  );
};

export default Slogan;
