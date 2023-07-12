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
import { useNavigate } from "react-router-dom";
import useGetAppointmentedDate from "../../hooks/use-get-appointmented-date";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import Divider from "@mui/material/Divider";
import { FaTrashAlt } from "react-icons/fa";

const Appointment = () => {
  const state = JSON.parse(sessionStorage.getItem("items"));
  const isLoged = localStorage.getItem("isLoged");
  const idCustomer = localStorage.getItem("idCustomer");

  const elevenAM = dayjs().set("hour", 11).startOf("hour");
  const fivePM = dayjs().set("hour", 17).startOf("hour");

  const navigate = useNavigate();

  const [errorMessagesTime, setErrorMessagesTime] = React.useState("");
  const [isValidTime, setIsValidTime] = React.useState(true);
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
    const checkedValuesString = checkedValues
      .map((value, index) => {
        if (index === 0 && checkedValues.length === 2) {
          return value + " dan ";
        } else if (index === checkedValues.length - 1) {
          return value;
        } else if (index === checkedValues.length - 2) {
          return value + ", dan ";
        } else {
          return value + ", ";
        }
      })
      .join("");
    if (keterangan && checkedValuesString) {
      desc = `Keterangan tambahan "${keterangan}" serta berencana untuk melakukan "${checkedValuesString}"`;
    } else if (keterangan) {
      desc = `Keterangan tambahan "${keterangan}"`;
    } else if (checkedValuesString) {
      desc = `Berencana untuk melakukan "${checkedValuesString}"`;
    }
    try {
      const date = new Date(selectedDate);
      date.setHours(7, 0, 0, 0);
      createAppointment({
        keterangan: desc,
        id_customer: idCustomer,
        tanggal: Timestamp.fromDate(date),
        waktu: displayTime,
        status: 1,
        koleksi: selectedCollection,
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
      sessionStorage.setItem("items", JSON.stringify([]));
      setSelectedCollection([]);
      setSelectedDate(new Date());
      setDisplayDate("Pilih tanggal pada kalender");
      setKeterangan("");
      closeConfirm();
      setRent("");
      setCustomRent("");
      setCustomMade("");
    }
  };

  const { listAppointmented } = useGetAppointmentedDate();

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

  function checkIsValidTime(time) {
    const validTime = elevenAM <= time && time <= fivePM;
    setIsValidTime(validTime);
    return validTime;
  }

  const handleChangeTime = (event) => {
    if (!checkIsValidTime(event)) {
      setErrorMessagesTime(errors.time);
    } else {
      setErrorMessagesTime("");
    }
  };

  const errors = {
    time: "Hanya dapat memilih waktu dari 11:00 AM s/d 18:00 PM",
  };

  const renderErrorMessageTime = () =>
    errorMessagesTime && <div className="error">{errorMessagesTime}</div>;

  // Function to delete an item from session storage
  function deleteItemFromStorage(index) {
    // Retrieve existing items from session storage
    let items = JSON.parse(sessionStorage.getItem("items")) || [];

    // Check if the index is valid
    if (index < 0 || index >= items.length) {
      console.log("Invalid index");
      return;
    }

    // Remove the item at the specified index
    items.splice(index, 1);

    // Store the updated array back to session storage
    sessionStorage.setItem("items", JSON.stringify(items));

    setSelectedCollection(JSON.parse(sessionStorage.getItem("items")) || []);
  }

  const [rent, setRent] = React.useState(state?.length ? "Rent" : "");
  const [customRent, setCustomRent] = React.useState("");
  const [customMade, setCustomMade] = React.useState("");

  const handleCheckboxChangeRent = (event) => {
    const { value, checked } = event.target;
    setRent(checked ? value : "");
  };

  const handleCheckboxChangeCustomRent = (event) => {
    const { value, checked } = event.target;
    setCustomRent(checked ? value : "");
  };

  const handleCheckboxChangeCustomMade = (event) => {
    const { value, checked } = event.target;
    setCustomMade(checked ? value : "");
  };

  const checkedValues = [rent, customRent, customMade].filter(
    (value) => value !== ""
  );

  return (
    <div className="content">
      <Navbar />
      <div className="appointmentContent">
        <div style={{ flex: 2, height: "fit-content" }}>
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
          <div style={{ fontSize: "14px", color: "grey", marginTop: "24px" }}>
            *tanda merah berarti jadwal appointment pada tanggal tersebut telah
            mencapai batas maksimal per hari
          </div>
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
                  maxTime={fivePM}
                  onChange={(time) => {
                    setSelectedTime(time);
                    changeDisplayTime(time);
                    handleChangeTime(time);
                  }}
                />
              </LocalizationProvider>
              {renderErrorMessageTime()}
            </div>
          </div>
          <div>
            <p>
              <b>Apa yang anda ingin bahas terkait Appointment nantinya?</b>
            </p>
            <div className="appointment-checkbox">
              <label>
                <input
                  type="checkbox"
                  value="Rent"
                  checked={rent}
                  onChange={handleCheckboxChangeRent}
                />
                Rent
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Custom Rent"
                  checked={customRent}
                  onChange={handleCheckboxChangeCustomRent}
                />
                Custom Rent
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Custom Made"
                  checked={customMade}
                  onChange={handleCheckboxChangeCustomMade}
                />
                Custom Made
              </label>
            </div>
          </div>
          {selectedCollection?.length !== 0 && selectedCollection !== null ? (
            <>
              <p>
                <b>Koleksi yang diinginkan: (Maksimal 5)</b>
                {selectedCollection?.length === 5 ? (
                  <></>
                ) : (
                  <button
                    className="appointment-changecol-button"
                    onClick={() => navigate("/rent")}
                  >
                    Tambah Koleksi
                  </button>
                )}
              </p>
              <div className="card-container" style={{ marginBottom: "16px" }}>
                {selectedCollection?.map((collection, index) => {
                  const isLastItem = index === selectedCollection.length - 1;
                  return (
                    <>
                      <div style={{ display: "flex" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flex: 1,
                          }}
                        >
                          <div class="appointment-img-container">
                            <img
                              src={collection.gambar}
                              alt=""
                              class="appointment-img"
                            />
                          </div>
                          <div style={{ margin: "0 8px" }}>
                            {collection.nama}
                          </div>
                          <div style={{ color: "#c69738", fontWeight: "600" }}>
                            {currencyFormat(collection.harga)}
                          </div>
                        </div>
                        <button
                          className="appointment-delete-button"
                          onClick={() => deleteItemFromStorage(index)}
                        >
                          <div>
                            <FaTrashAlt /> Hapus
                          </div>
                        </button>
                      </div>
                      {isLastItem ? null : (
                        <Divider style={{ margin: "8px 0" }} />
                      )}
                    </>
                  );
                })}
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
          {displayDate === "Pilih tanggal pada kalender" || !isValidTime ? (
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
              {selectedCollection?.length === 0
                ? ""
                : " untuk membahas mengenai koleksi "}
              {selectedCollection?.map((collection, index) => (
                <span>
                  <b>{collection?.nama}</b>
                  {index === 0 && selectedCollection.length === 2
                    ? " dan "
                    : index === selectedCollection.length - 1
                    ? ""
                    : index === selectedCollection.length - 2
                    ? ", dan "
                    : ", "}
                </span>
              ))}
              {keterangan === "" ? "" : " dengan keterangan tambahan "}
              <b>{keterangan}</b>
              {checkedValues.length === 0
                ? ""
                : " serta berencana untuk melakukan "}
              {checkedValues.map((values, index) => (
                <span>
                  <b>{values}</b>
                  {index === 0 && checkedValues.length === 2
                    ? " dan "
                    : index === checkedValues.length - 1
                    ? ""
                    : index === checkedValues.length - 2
                    ? ", dan "
                    : ", "}
                </span>
              ))}
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
