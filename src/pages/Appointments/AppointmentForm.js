import * as React from "react";
import { useNavigate } from "react-router-dom";
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

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextInputField from "../../components/field/text-input";
import { Timestamp } from "firebase/firestore";
import dayjs from "dayjs";
import { createAppointment } from "../../services/appointment";

const AppointmentForm = () => {
  const [customer, setCustomer] = React.useState();
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();

  const defaultValues = React.useMemo(
    () => ({ tanggal: new Date(), keterangan: "" }),
    []
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

  const onSubmit = React.useCallback(async (values) => {
    try {
      createAppointment({
        keterangan: values.keterangan,
        id_customer: values.customer,
        tanggal: Timestamp.fromDate(new Date(values.tanggal)),
      });
      notifications.show({
        title: "Tambah Appointment",
        message: "Pengeluaran baru telah berhasil ditambahkan",
        color: "teal",
      });
    } catch (e) {
      notifications.show({
        title: "Tambah Appointment",
        message: "Appointment baru gagal ditambahkan",
        color: "red",
      });
    } finally {
    }
  }, []);

  const onClickAdd = React.useCallback(() => {
    open();
  }, [open]);

  return (
    <div className="appointment-form">
      <AdminTitle props={"Appointment"} />
      <div onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
        <i
          class="fa fa-chevron-left"
          aria-hidden="true"
          style={{ margin: "1%" }}
        ></i>
        Kembali
      </div>
      <div className="appointment-form-content">
        <Form onSubmit={onSubmit} methods={methods}>
          <div className="appointment-form-customer">
            <CustomerSelectInput style={{ flex: "70" }} name="customer" />
            <button
              className="appointment-form-customer-add"
              onClick={onClickAdd}
            >
              + TAMBAH CUSTOMER
            </button>
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
            <button className="appointment-form-simpan" type="submit">
              SIMPAN
            </button>
          </Flex>
        </Form>
      </div>
      <Modal opened={opened} centered onClose={close} withCloseButton={false}>
        <CustomerForm onClose={close} />
      </Modal>
    </div>
  );
};

export default AppointmentForm;
