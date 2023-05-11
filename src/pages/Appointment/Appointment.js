import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import "./Appointment.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../components/Navbar/Navbar";

const Appointment = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="content">
      <Navbar />
      <div className="appointmentContent">
        <div className="appointmentCalendar">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            inline
            minDate={new Date()}
            // excludeDates={[new Date(), subDays(new Date(), 1)]}
          />
        </div>
        <div className="appointmentText">
          <p className="appointmentTitle">Make an appointment</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
          </p>
          <p>
            <b>Check appointment availability on calendar ...</b>
          </p>
          <button className="appointmentButton">BOOK APPOINTMENT NOW!</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Appointment;
