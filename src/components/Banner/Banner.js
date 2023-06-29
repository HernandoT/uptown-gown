import "./Banner.css";

const Banner = ({ image }) => {
  return (
    <div className="banner">
      <img src={image} alt="Banner" className="banner-image"></img>
    </div>
  );
};

export default Banner;
