import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import "./Appointment.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../components/Navbar/Navbar";
import SupportEngine from "../../SupportEngine";

const Appointment = () => {
  const isLoged = localStorage.getItem("isLoged");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayDate, setDisplayDate] = useState("");

  const changeDisplayDate = (selectedDate) => {
    const date = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();
    setDisplayDate(date + '/' + month + '/' + year)
  }

  return (
    <div className="content">
      <Navbar />
      <div className="appointmentContent">
        <div className="appointmentCalendar">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              changeDisplayDate(date);
            }}
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
            <b>Waktu appointment yang tersedia dapat dipilih pada kalender</b>
          </p>
          <input value={displayDate} disabled className="appointment-keterangan" placeholder="Pilih tanggal pada kalender"></input>
          <input
            type="text"
            placeholder="Keterangan"
            className="appointment-keterangan"
          ></input>
          <button className="appointmentButton">BOOK APPOINTMENT NOW!</button>
        </div>
      </div>
      <Footer />
      {isLoged === "true" ? <SupportEngine /> : ""}
    </div>
  );
};

export default Appointment;
