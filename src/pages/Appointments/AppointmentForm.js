import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./AppointmentForm.css";
import { Flex, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CustomerForm from "../Customer/CustomerForm";
import Separator from "../../components/separator";
import { notifications } from "@mantine/notifications";
import * as Yup from "yup";
import useYupValidationResolver from "../../hooks/use-yup-resolver";
import Form from "../../components/field/form";
import { useForm } from "react-hook-form";
import CustomerSelectInput from "../../components/Select/customer-select-input";
import TextInputField from "../../components/field/text-input";
import { Timestamp } from "firebase/firestore";
import {
  createAppointment,
  getAppointment,
  updateAppointment,
} from "../../services/appointment";
import DateInputField from "../../components/field/date-input";
import BackButton from "../../components/BackButton";
import useGetAppointmentedDate from "../../hooks/use-get-appointmented-date";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import RadioInputField from "../../components/field/radio-input";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Divider from "@mui/material/Divider";

const AppointmentForm = () => {
  //Get Detail
  const { id } = useParams();
  const { data, isSuccess, isFetching } = useQuery(
    ["get-appointment", id],
    () => getAppointment(id || ""),
    { enabled: !!id }
  );

  //Get list of appointmented date
  const { listAppointmented } = useGetAppointmentedDate();

  const navigate = useNavigate();

  const defaultValues = React.useMemo(
    () => ({
      customer: data?.appointment.id_customer || null,
      tanggal: data?.appointment.tanggal.toDate() || new Date(),
      keterangan: data?.appointment.keterangan,
      status: data?.appointment.status.toString(),
    }),
    [data]
  );

  const [isSelesai, setIsSelesai] = React.useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedTime, setSelectedTime] = React.useState(
    dayjs().set("hour", 12).startOf("hour")
  );
  const [displayTime, setDisplayTime] = React.useState("12:00 WIB");

  const changeDisplayTime = (selectedTime) => {
    const hour = selectedTime.get("hour").toString();
    let minute = selectedTime.get("minute").toString();
    if (minute.length === 1) minute = `0${minute}`;
    setDisplayTime(hour + ":" + minute + " WIB");
  };

  const elevenAM = dayjs().set("hour", 11).startOf("hour");
  const sixPM = dayjs().set("hour", 18).startOf("hour");

  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        customer: Yup.string().required("Harap pilih Customer terlebih dahulu"),
        tanggal: Yup.date().required("Harap pilih tanggal"),
      }),
    []
  );

  const resolver = useYupValidationResolver(yupSchema);

  const methods = useForm({
    defaultValues,
    resolver,
    mode: "onChange",
  });

  const onSubmit = React.useCallback(
    async (values) => {
      const date = new Date(values.tanggal);
      date.setHours(7, 0, 0, 0);
      try {
        data?.appointment
          ? updateAppointment(id, {
              keterangan: values.keterangan,
              id_customer: values.customer,
              tanggal: Timestamp.fromDate(date),
              waktu: displayTime,
              status: parseInt(values.status),
              selesai: isSelesai ? 1 : 0,
              koleksi: data?.appointment.koleksi,
            })
          : createAppointment({
              keterangan: values.keterangan,
              id_customer: values.customer,
              tanggal: Timestamp.fromDate(date),
              waktu: displayTime,
              status: 2,
              selesai: isSelesai ? 1 : 0,
              koleksi: [],
            });
        notifications.show({
          title: data?.appointment ? "Edit Appointment" : "Tambah Appointment",
          message: data?.appointment
            ? "Appointment telah berhasil diupdate"
            : "Appointment baru telah berhasil ditambahkan",
          color: "teal",
        });
      } catch (e) {
        console.log(e);
        notifications.show({
          title: data?.appointment ? "Edit Appointment" : "Tambah Appointment",
          message: data?.appointment
            ? "Appointment gagal diupdate"
            : "Appointment baru gagal ditambahkan",
          color: "red",
        });
      } finally {
        navigate("/admin/appointment");
      }
    },
    [data?.appointment, displayTime, id, isSelesai, navigate]
  );

  const onClickAdd = React.useCallback(() => {
    open();
  }, [open]);

  const shouldDisableDate = React.useCallback(
    (day) => {
      const formatedDate = day.format("DD/MM/YYYY");
      const currentDate = dayjs(methods.getValues("tanggal")).format(
        "DD/MM/YYYY"
      );

      if (formatedDate === currentDate) {
        return false;
      }

      const isDisabled =
        !!listAppointmented[formatedDate] &&
        listAppointmented[formatedDate] > 2;
      return isDisabled;
    },
    [listAppointmented, methods]
  );

  const handleCheckboxChange = (event) => {
    setIsSelesai(event.target.checked);
  };

  //set value when get detail
  React.useEffect(() => {
    if (isSuccess) {
      methods.reset(defaultValues);
      setIsSelesai(data?.appointment.selesai);
      if (data?.appointment.waktu) {
        setDisplayTime(data?.appointment.waktu);
        setSelectedTime(
          dayjs()
            .set("hour", data?.appointment.waktu.slice(0, 2))
            .set("minute", data?.appointment.waktu.slice(3, 5))
        );
      }
    }
  }, [data?.appointment.waktu, defaultValues, isSuccess, methods]);

  if (isFetching) {
    return null;
  }

  return (
    <div className="appointment-form-container">
      <div className="appointment-form">
        <AdminTitle props={"Appointment"} />
        <BackButton />
        {isFetching ? (
          <></>
        ) : (
          <>
            <div className="appointment-form-content card-container">
              <Form onSubmit={onSubmit} methods={methods}>
                <div className="appointment-form-customer">
                  <CustomerSelectInput
                    style={{ flex: "70" }}
                    name="customer"
                    disabled={data?.appointment}
                  />
                  {data?.appointment ? (
                    <></>
                  ) : (
                    <button
                      className="appointment-form-customer-add"
                      onClick={onClickAdd}
                      type="button"
                    >
                      + TAMBAH CUSTOMER
                    </button>
                  )}
                </div>
                <Separator _gap={24} />
                <div
                  style={{
                    display: "flex",
                    gap: "24px",
                    alignItems: "flex-end",
                  }}
                >
                  <DateInputField
                    shouldDisableDate={shouldDisableDate}
                    name="tanggal"
                    label="Tanggal Appointment"
                    style={{ flex: 1 }}
                  />
                  <div style={{ flex: 1, width: "100%" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        label="Waktu Appointment"
                        defaultValue={selectedTime}
                        onChange={(time) => {
                          setSelectedTime(time);
                          changeDisplayTime(time);
                        }}
                        sx={{ width: "100%" }}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <Separator _gap={24} />
                <TextInputField
                  label="Keterangan"
                  name="keterangan"
                  multiline={true}
                  rows={6}
                />
                <Separator _gap={24} />
                {data?.appointment ? (
                  <>
                    {data?.appointment.koleksi.length !== 0 ? (
                      <>
                        <p style={{ marginTop: 0 }}>
                          <strong>Koleksi:</strong>
                        </p>
                        <div
                          className="card-container"
                          style={{ marginBottom: "8px", boxShadow: "none" }}
                        >
                          {data?.appointment.koleksi.map(
                            (collection, index) => {
                              const isLastItem =
                                index === data?.appointment.koleksi.length - 1;
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
                                      <div style={{ margin: "0 24px" }}>
                                        {collection.nama}
                                      </div>
                                    </div>
                                  </div>
                                  {isLastItem ? null : (
                                    <Divider style={{ margin: "8px 0" }} />
                                  )}
                                </>
                              );
                            }
                          )}
                        </div>
                        <Separator _gap={24} />
                      </>
                    ) : (
                      <></>
                    )}
                    <RadioInputField
                      name="status"
                      options={[
                        { value: "2", label: "Terima" },
                        { value: "3", label: "Tolak" },
                      ]}
                    />
                    <Separator _gap={24} />
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <strong>Status Kedatangan:</strong>
                      <label style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type="checkbox"
                          checked={isSelesai}
                          onChange={handleCheckboxChange}
                        />
                        Selesai
                      </label>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <Flex justify="flex-end">
                  <button className="appointment-form-simpan" type="submit">
                    SIMPAN
                  </button>
                </Flex>
              </Form>
            </div>
            <Modal
              opened={opened}
              centered
              onClose={close}
              withCloseButton={false}
            >
              <CustomerForm onClose={close} />
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;
