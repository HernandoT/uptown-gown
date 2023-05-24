import { useState } from "react";
import {
  TextField,
} from "@mui/material";
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
          Uptown Gown selalu memberikan yang terbaik untuk acara spesialmu. 
          Kami memiliki layanan sewa gaun pesta dan custom terbaik dengan harga yang terjangkau dan kualitas 
          yang bagus dari bahan yang dipilih oleh designer profesional kami secara langsung.  
          Kami memberikan yang terbaik untuk gaun pesta di hari specialmu dan juga merancang sekaligus membuat gaun 
          pesta terbaik untukmu. Booking appointment sekarang dan wujudkan gaun impianmu!{" "}
          </p>
          <p>
            <b>Waktu appointment yang tersedia dapat dipilih pada kalender</b>
          </p>
          <div className="appointment-input-container">
            <TextField 
              disabled 
              id="outlined-disabled" 
              label={displayDate=== "" ? "Pilih tanggal pada kalender": ""}
              value={displayDate} 
              InputLabelProps={{shrink: false}}
            />
          </div>
          <div className="appointment-input-container">
            <TextField id="outlined-basic" label="Keterangan" variant="outlined" />
          </div>
          <button className="appointmentButton">AJUKAN APPOINTMENT</button>
        </div>
      </div>
      <Footer />
      {isLoged === "true" ? <SupportEngine /> : ""}
    </div>
  );
};

export default Appointment;
