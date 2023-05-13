import "./Testimonials.css";
import { FaQuoteLeft } from "react-icons/fa";
import { useEffect } from "react";

const Testimonials = () => {
  useEffect(() => {
    const script = document.createElement('script');
  
    script.src = "https://apps.elfsight.com/p/platform.js";
    script.async = true;
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);
  
  return (
    <div className="testimonials">
      <div className="testimonialsTitle">
        <div className="testimonialStrip"></div>
        <p>Customer Testimonials</p>
      </div>
      <div className="testimonialsContent">
        {/* {Array.from({ length: 3 }).map((testimonial, index) => (
          <div className="testimonial" key={index}>
            <FaQuoteLeft className="testimonialIcon"/>
            <div className="testimonialText">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </div>
            <div className="testimonialName">Name - Lorem ipsum</div>
          </div>
        ))} */}
        <div className="elfsight-app-9a5e0f8d-c007-4fb8-abc5-895f8e6331a0"></div>
      </div>
    </div>
  );
};

export default Testimonials;
