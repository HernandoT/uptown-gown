import * as React from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import Footer from "../../components/Footer/Footer";
import "./Appointment.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../components/Navbar/Navbar";
import SupportEngine from "../../SupportEngine";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Flex, Text, Paper } from "@mantine/core";
import Separator from "../../components/separator";
import { notifications } from "@mantine/notifications";
import { Timestamp } from "firebase/firestore";
import { createAppointment } from "../../services/appointment";
import { useLocation, useNavigate } from "react-router-dom";
import useGetAppointmentedDate from "../../hooks/use-get-appointmented-date";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

const Appointment = () => {
  const { state } = useLocation();
  const isLoged = localStorage.getItem("isLoged");
  const idCustomer = localStorage.getItem("idCustomer");

  const elevenAM = dayjs().set("hour", 11).startOf("hour");
  const sixPM = dayjs().set("hour", 18).startOf("hour");

  const navigate = useNavigate();

  const [selectedCollection, setSelectedCollection] = React.useState(state);
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState(
    dayjs().set("hour", 12).startOf("hour")
  );
  const [displayDate, setDisplayDate] = React.useState(
    "Pilih tanggal pada kalender"
  );
  const [displayTime, setDisplayTime] = React.useState("12:00 WIB");
  const [keterangan, setKeterangan] = React.useState("");

  const [openConfirmationDialog, { open: openConfirm, close: closeConfirm }] =
    useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);

  const changeDisplayDate = (selectedDate) => {
    const date = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();
    setDisplayDate(date + "/" + month + "/" + year);
  };

  const changeDisplayTime = (selectedTime) => {
    const hour = selectedTime.get("hour").toString();
    let minute = selectedTime.get("minute").toString();
    if (minute.length === 1) minute = `0${minute}`;
    setDisplayTime(hour + ":" + minute + " WIB");
  };

  const addAppointment = (keterangan, selectedDate) => {
    let desc = "-";
    if (keterangan && selectedCollection) {
      desc = `Memilih koleksi "${selectedCollection.nama}" dengan keterangan tambahan "${keterangan}"`;
    } else if (keterangan) {
      desc = `Keterangan tambahan "${keterangan}"`;
    } else if (selectedCollection) {
      desc = `Memilih koleksi "${selectedCollection.nama}"`;
    }
    try {
      createAppointment({
        keterangan: desc,
        id_customer: idCustomer,
        tanggal: Timestamp.fromDate(new Date(selectedDate)),
        waktu: displayTime,
        status: 1,
      });
      notifications.show({
        title: "Pengajuan Appointment",
        message: "Appointment baru telah berhasil diajukan",
        color: "teal",
      });
    } catch (e) {
      notifications.show({
        title: "Pengajuan Appointment",
        message: "Appointment baru gagal diajukan",
        color: "red",
      });
    } finally {
      setSelectedCollection(null);
      setSelectedDate(new Date());
      setDisplayDate("Pilih tanggal pada kalender");
      setKeterangan("");
      closeConfirm();
    }
  };

  const { listAppointmented } = useGetAppointmentedDate();
  console.log(listAppointmented)
  const disabledDate = [];
  Object.keys(listAppointmented)?.map((keyDate) => {
    if (listAppointmented[keyDate] > 2) {
      const date = keyDate.split("/");
      disabledDate.push(new Date(+date[2], date[1] - 1, +date[0]));
    }
  });

  function currencyFormat(num) {
    return "Rp. " + num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <div className="content">
      <Navbar />
      <div className="appointmentContent">
        <div className="appointmentCalendar card-container">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              changeDisplayDate(date);
            }}
            inline
            minDate={new Date()}
            excludeDates={disabledDate}
          />
        </div>
        <div className="appointmentText">
          <p className="appointmentTitle">Make an appointment</p>
          <p>
            Uptown Gown selalu memberikan yang terbaik untuk acara spesialmu.
            Kami memiliki layanan sewa gaun pesta dan custom terbaik dengan
            harga yang terjangkau dan kualitas yang bagus dari bahan yang
            dipilih oleh designer profesional kami secara langsung. Kami
            memberikan yang terbaik untuk gaun pesta di hari specialmu dan juga
            merancang sekaligus membuat gaun pesta terbaik untukmu. Booking
            appointment sekarang dan wujudkan gaun impianmu!{" "}
          </p>
          <p>
            <b>Waktu appointment yang ingin diajukan:</b>
          </p>
          <div className="appointment-input-container">
            <FormControl style={{ flex: 1 }}>
              <InputLabel htmlFor="outlined-adornment-date">
                Tangal Appointment
              </InputLabel>
              <OutlinedInput
                value={displayDate}
                id="outlined-adornment-date"
                startAdornment={
                  <InputAdornment position="start">
                    <i
                      className="fa fa-calendar fa-lg"
                      style={{ marginRight: 5 }}
                    ></i>
                  </InputAdornment>
                }
                label="Tanggal Appointment"
                disabled
              />
            </FormControl>
            <div style={{ flex: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Waktu Appointment"
                  defaultValue={selectedTime}
                  minTime={elevenAM}
                  maxTime={sixPM}
                  onChange={(time) => {
                    setSelectedTime(time);
                    changeDisplayTime(time);
                    console.log(displayTime);
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
          {selectedCollection ? (
            <>
              <p>
                <b>Koleksi yang diinginkan:</b>
                <button
                  className="appointment-changecol-button"
                  onClick={() => navigate("/rent")}
                >
                  Ganti Koleksi
                </button>
              </p>
              <div className="collection-card card-container">
                <div class="appointment-img-container">
                  <img
                    src={selectedCollection.gambar}
                    alt=""
                    class="appointment-img"
                  />
                </div>
                <div style={{ margin: "0 8px 0 16px" }}>
                  <div>{selectedCollection.nama}</div>
                  <div style={{ color: "#c69738", fontWeight: "600" }}>
                    {currencyFormat(selectedCollection.harga)}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <p>
                <b>
                  Apakah anda memiliki koleksi yang ingin kami siapkan pada saat
                  appointment?
                </b>
              </p>
              <button
                className="appointment-collection-button"
                onClick={() => navigate("/rent")}
              >
                Pilih Koleksi (Opsional)
              </button>
            </>
          )}
          <p>
            <b>Keterangan tambahan jika ada hal lain yang diinginkan:</b>
          </p>
          <div className="appointment-input-container">
            <TextField
              style={{ width: "100%" }}
              value={keterangan}
              id="outlined-basic"
              label="Keterangan Tambahan (Opsional)"
              variant="outlined"
              multiline={true}
              rows={3}
              onChange={(e) => setKeterangan(e.target.value)}
            />
          </div>
          {displayDate === "Pilih tanggal pada kalender" ? (
            <></>
          ) : (
            <button
              className="appointmentButton"
              onClick={isLoged === "true" ? openConfirm : open}
            >
              AJUKAN APPOINTMENT
            </button>
          )}
        </div>
      </div>
      <Modal
        onClose={closeConfirm}
        opened={openConfirmationDialog}
        withCloseButton={false}
        centered
      >
        <Paper p={24} miw={400}>
          <Flex direction="column">
            <Text fz={20} fw={600}>
              Confirm
            </Text>
            <Separator _gap={24} />
            <Text>
              Apakah kamu yakin ingin mengajukan appointment untuk tanggal{" "}
              <b>{displayDate}</b> pada pukul <b>{displayTime}</b>
              {selectedCollection ? " untuk membahas mengenai koleksi " : ""}
              <b>{selectedCollection?.nama}</b>
              {keterangan === "" ? "" : " dengan keterangan tambahan "}
              <b>{keterangan}</b>?
            </Text>
            <Separator _gap={24} />
            <Flex justify="flex-end">
              <Button variant="text" color="error" onClick={closeConfirm}>
                Tidak
              </Button>
              <Button
                variant="text"
                onClick={() => addAppointment(keterangan, selectedDate)}
              >
                Ya
              </Button>
            </Flex>
          </Flex>
        </Paper>
      </Modal>
      <Modal onClose={close} opened={opened} withCloseButton={false} centered>
        <Paper p={24} miw={400}>
          <Flex direction="column">
            <Text fz={20} fw={600}>
              Not Loged In
            </Text>
            <Separator _gap={24} />
            <Text>
              Harap untuk Login terlebih dahulu sebelum melakukan pengajuan
            </Text>
            <Separator _gap={24} />
            <Flex justify="flex-end">
              <Button variant="text" color="error" onClick={close}>
                Kembali
              </Button>
              <Button variant="text" onClick={() => navigate("/login")}>
                Login
              </Button>
            </Flex>
          </Flex>
        </Paper>
      </Modal>
      <Footer />
      {isLoged === "true" ? <SupportEngine /> : ""}
    </div>
  );
};

export default Appointment;
