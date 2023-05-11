import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./Detail.css";

const Detail = () => {
  return (
    <div className="detail">
      <Navbar />
      <div className="detailContent">
        <div className="detailImage">
          <div className="detailImage1">Image 1</div>
          <div className="detailImage2">Image 2</div>
          <div className="detailImage2">Image 3</div>
          <div className="detailImage2">Image 4</div>
        </div>
        <div className="detailDesc">
          <div className="detailTitle">
            <div className="strip"></div>
            <p>Name Lorem Ipsum (?)</p>
          </div>
          <div className="detailText">
            <p>
              keywords, descriptions, and other details (size details, etc) -
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Posuere urna nec tincidunt praesent. Mauris nunc congue nisi
              vitae. Viverra tellus in hac habitasse. Curabitur vitae nunc sed
              velit dignissim. Suspendisse potenti nullam ac tortor vitae purus
              faucibus ornare.
            </p>
            <p>
              Viverra ipsum nunc aliquet bibendum enim facilisis gravida. Sed
              faucibus turpis in eu mi bibendum neque egestas congue. Quis
              blandit turpis cursus in hac habitasse platea. Porttitor massa id
              neque aliquam vestibulum morbi blandit cursus risus.{" "}
            </p>
            <p><b>Check availability:</b></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Detail;
