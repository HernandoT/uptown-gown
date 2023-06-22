import "./Banner.css";

const Banner = ({ image }) => {
  return (
    <div className="banner">
      <img src={image} alt="Image" className="banner-image"></img>
    </div>
  );
};

export default Banner;
