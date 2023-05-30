import * as React from "react";
import { useNavigate } from "react-router-dom";
import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./AppointmentForm.css";
import { Flex, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CustomerForm from "../Customer/CustomerForm";
import Separator from "../../components/separator";

import * as Yup from "yup";
import useYupValidationResolver from "../../hooks/use-yup-resolver";
import Form from "../../components/field/form";
import { useForm } from "react-hook-form";
import CustomerSelectInput from "../../components/Select/customer-select-input";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextInputField from "../../components/field/text-input";

const AppointmentForm = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();

  const defaultValues = React.useMemo(
    () => ({ tanggal: new Date(), keterangan: "" }),
    []
  );

  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
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
    } catch (e) {
    } finally {
    }
  }, []);

  const onClickAdd = React.useCallback(() => {
    open();
  }, [open]);

  return (
    <div className="appointment-form">
      <AdminTitle props={"Appointment"} />
      <div onClick={() => navigate(-1)} style={{cursor: "pointer"}}>
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
            <CustomerSelectInput style={{ flex: "70" }} />
            <button
              className="appointment-form-customer-add"
              onClick={onClickAdd}
            >
              + TAMBAH CUSTOMER
            </button>
          </div>
          <Separator _gap={24} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Tanggal Pengeluaran" format="DD/MM/YYYY" />
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
