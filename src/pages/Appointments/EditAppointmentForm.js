import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./EditAppointmentForm.css";
import { Flex } from "@mantine/core";
import Separator from "../../components/separator";
import { notifications } from "@mantine/notifications";

import * as Yup from "yup";
import useYupValidationResolver from "../../hooks/use-yup-resolver";
import Form from "../../components/field/form";
import { useForm } from "react-hook-form";
import CustomerSelectInput from "../../components/Select/customer-select-input";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextInputField from "../../components/field/text-input";
import { Timestamp } from "firebase/firestore";
import dayjs from "dayjs";
import { createAppointment, getAppointment } from "../../services/appointment";
import { useQuery } from "@tanstack/react-query";

const EditAppointmentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isSuccess, isFetching } = useQuery(
    ["get-appointment", id],
    () => getAppointment(id || "")
  );

  console.log(data, id);
  const defaultValues = React.useMemo(
    () => ({
      customer: data?.appointment.id_customer,
      tanggal: dayjs(data?.appointment.tanggal).toDate() || new Date(),
      keterangan: data?.appointment.keterangan,
    }),
    [data]
  );

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
      try {
        // createAppointment({
        //   keterangan: values.keterangan,
        //   id_customer: values.customer,
        //   tanggal: Timestamp.fromDate(new Date(values.tanggal)),
        //   status: 1,
        // });
        // notifications.show({
        //   title: "Tambah Appointment",
        //   message: "Pengeluaran baru telah berhasil ditambahkan",
        //   color: "teal",
        // });
        navigate("/admin/appointment");
      } catch (e) {
        notifications.show({
          title: "Tambah Appointment",
          message: "Appointment baru gagal ditambahkan",
          color: "red",
        });
      } finally {
      }
    },
    [navigate]
  );

  React.useEffect(() => {
    if (isSuccess) {
      methods.reset(defaultValues);
    }
  }, [defaultValues, isSuccess, methods]);

  if (isFetching) {
    return null;
  }

  return (
    <div className="edit-appointment-form">
      <AdminTitle props={"Appointment"} />
      <div onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
        <i
          class="fa fa-chevron-left"
          aria-hidden="true"
          style={{ margin: "1%" }}
        ></i>
        Kembali
      </div>
      <div className="edit-appointment-form-content">
        <Form onSubmit={onSubmit} methods={methods}>
          <div className="edit-appointment-form-customer">
            <CustomerSelectInput name="customer" disabled={true} />
          </div>
          <Separator _gap={24} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Tanggal Pengeluaran"
              format="DD/MM/YYYY"
              value={dayjs(new Date())}
            />
          </LocalizationProvider>
          <Separator _gap={24} />
          <TextInputField
            label="Keterangan"
            name="keterangan"
            multiline={true}
            rows={6}
          />
          <Separator _gap={24} />
          <Flex justify="flex-end">
            <button className="edit-appointment-form-simpan" type="submit">
              SIMPAN
            </button>
          </Flex>
        </Form>
      </div>
    </div>
  );
};

export default EditAppointmentForm;
