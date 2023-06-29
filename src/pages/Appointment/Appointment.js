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

const Appointment = () => {
  const { state } = useLocation();
  const isLoged = localStorage.getItem("isLoged");
  const idCustomer = localStorage.getItem("idCustomer");

  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = React.useState("");
  const [displayDate, setDisplayDate] = React.useState(
    "Pilih tanggal pada kalender"
  );
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

  const addAppointment = (keterangan, selectedDate) => {
    try {
      createAppointment({
        keterangan: keterangan ? keterangan : "-",
        id_customer: idCustomer,
        tanggal: Timestamp.fromDate(new Date(selectedDate)),
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
      setSelectedDate(new Date());
      setDisplayDate("Pilih tanggal pada kalender");
      setKeterangan("");
      closeConfirm();
    }
  };

  const { listAppointmented } = useGetAppointmentedDate();
  const disabledDate = [];
  Object.keys(listAppointmented)?.map((keyDate) => {
    if (listAppointmented[keyDate] > 2) {
      const date = keyDate.split('/');
      disabledDate.push(new Date(+date[2], date[1] - 1, +date[0]));
    }
  });

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
            <b>Waktu appointment yang tersedia dapat dipilih pada kalender</b>
          </p>
          <div className="appointment-input-container">
            <FormControl fullWidth>
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
          </div>
          {JSON.stringify(state)}
          <div className="appointment-input-container">
            <TextField
              value={keterangan}
              id="outlined-basic"
              label="Keterangan"
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
              <b>{displayDate}</b>
              {keterangan === ""
                ? ""
                : " dengan keterangan: “" + keterangan + "”"}
              ?
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
