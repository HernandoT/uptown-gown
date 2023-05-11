import "./Testimonials.css";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div className="testimonials">
      <div className="testimonialsTitle">
        <div className="testimonialStrip"></div>
        <p>Customer Testimonials</p>
      </div>
      <div className="testimonialsContent">
        {Array.from({ length: 3 }).map((testimonial, index) => (
          <div className="testimonial" key={index}>
            <FaQuoteLeft className="testimonialIcon"/>
            <div className="testimonialText">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </div>
            <div className="testimonialName">Name - Lorem ipsum</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
