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
import { createAppointment, getAppointment } from "../../services/appointment";
import DateInputField from "../../components/field/date-input";
import BackButton from "../../components/BackButton";
import useGetAppointmentedDate from "../../hooks/use-get-appointmented-date";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const AppointmentForm = () => {
  const [opened, { open, close }] = useDisclosure(false);
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
    }),
    [data]
  );

  console.log(defaultValues);

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
        createAppointment({
          keterangan: values.keterangan,
          id_customer: values.customer,
          tanggal: Timestamp.fromDate(new Date(values.tanggal)),
          status: 1,
        });
        notifications.show({
          title: "Tambah Appointment",
          message: "Pengeluaran baru telah berhasil ditambahkan",
          color: "teal",
        });
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

  //set value when get detail
  React.useEffect(() => {
    if (isSuccess) {
      methods.reset(defaultValues);
    }
  }, [defaultValues, isSuccess, methods]);

  if (isFetching) {
    return null;
  }

  return (
    <div className="appointment-form">
      <AdminTitle props={"Appointment"} />
      <BackButton />
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
          <DateInputField
            shouldDisableDate={shouldDisableDate}
            name="tanggal"
            label="Tanggal Pengeluaran"
          />
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
