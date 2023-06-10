import "./InvoiceForm.css";
import * as React from "react";
import AdminTitle from "../../components/AdminTitle/AdminTitle";
import BackButton from "../../components/BackButton";
import Form from "../../components/field/form";
import { useForm } from "react-hook-form";
import CustomerSelectInput from "../../components/Select/customer-select-input";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import CustomerForm from "../Customer/CustomerForm";
import DateInputField from "../../components/field/date-input";
import InvoiceTypeSelectInput from "../../components/Select/invoice-type-select-input";
import Separator from "../../components/separator";

const InvoiceForm = () => {
  const [openedCustomer, { open: openCustomer, close: closeCustomer }] =
    useDisclosure(false);

  const onSubmit = React.useCallback(async (values) => {
    try {
      console.log(values);
    } catch (e) {
      console.log(e.messages);
    } finally {
    }
  });

  const methods = useForm({
    // defaultValues,
    // resolver,
    mode: "onChange",
  });

  const onClickAddCustomer = React.useCallback(() => {
    openCustomer();
  }, [openCustomer]);

  return (
    <div className="invoice-form">
      <AdminTitle props={"Invoice"} />
      <BackButton />
      <div className="invoice-form-content">
        <Form onSubmit={onSubmit} methods={methods}>
          <div className="invoice-form-customer">
            <CustomerSelectInput style={{ flex: "70" }} name="customer" />
            <button
              className="invoice-form-customer-add"
              onClick={onClickAddCustomer}
              type="button"
            >
              + TAMBAH CUSTOMER
            </button>
          </div>
					<Separator _gap={24} />
					<div className="invoice-form-type">
						<InvoiceTypeSelectInput name="invoice-type" />
						<DateInputField label="Tanggal Acara" />
					</div>
        </Form>
      </div>
      <Modal
        opened={openedCustomer}
        centered
        onClose={closeCustomer}
        withCloseButton={false}
      >
        <CustomerForm onClose={closeCustomer} />
      </Modal>
    </div>
  );
};

export default InvoiceForm;
