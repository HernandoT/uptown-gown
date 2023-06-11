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
import TextInputField from "../../components/field/text-input";
import RadioInputField from "../../components/field/radio-input";
import CollectionSelectInput from "../../components/Select/collection-select-input";

const InvoiceForm = () => {
  const [inputItems, setInputItems] = React.useState([
    { id_collection: "" },
  ]);

  const handleItemChange = (index, event) => {
    const data = [...inputItems];
  };

  const addItems = () => {
    const newItem = { id_collection: "" };
    setInputItems([...inputItems, newItem]);
  };

  const removeItems = (index) => {
    let data = [...inputItems];
    data.splice(index, 1)
    setInputItems(data)
}

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
          <div style={{ display: "flex", height: "auto" }}>
            <CustomerSelectInput style={{ flex: "70" }} name="customer" />
            <button
              className="invoice-form-customer-add"
              onClick={onClickAddCustomer}
              type="button"
            >
              + TAMBAH CUSTOMER
            </button>
          </div>
          <Separator _gap={12} />
          <div style={{ display: "flex", height: "auto" }}>
            <InvoiceTypeSelectInput
              name="invoice-type"
              style={{ marginTop: 8, marginRight: 20 }}
            />
            <DateInputField label="Tanggal Acara" />
          </div>
          <Separator _gap={12} />
          <div style={{ display: "flex", alignItems: "center" }}>
            <p>
              <strong>List Barang:</strong>
            </p>
            <button className="invoice-form-item-add" onClick={addItems}>
              TAMBAH BARANG
            </button>
          </div>
          <Separator _gap={12} />
          {inputItems.map((input, index) => {
            return (
              <>
                <div key={index} style={{ display: "flex", height: "auto" }}>
                  <CollectionSelectInput style={{flex: 5}} />
                  <button className="item-delete-button" onClick={() => removeItems(index)}>
                    <i class="fa fa-trash fa-2x"></i>
                  </button>
                </div>
                <Separator _gap={24} />
              </>
            );
          })}
          <div style={{ display: "flex", height: "auto" }}>
            <TextInputField
              name="totalPrice"
              label="Total"
              style={{ flex: 1, marginRight: 20 }}
            />
            <TextInputField
              name="earnestPay"
              label="Panjar"
              style={{ flex: 1, marginRight: 20 }}
            />
            <TextInputField
              name="deposit"
              label="Deposit"
              style={{ flex: 1 }}
            />
          </div>
          <Separator _gap={24} />
          <TextInputField name="additionalCost" label="Biaya Tambahan" />
          <Separator _gap={12} />
          <p>
            <strong>List Barang:</strong>
          </p>
          <RadioInputField
            options={[
              { value: "Belum Lunas", label: "Belum Lunas" },
              { value: "Lunas", label: "Lunas" },
              { value: "Selesai", label: "Selesai" },
            ]}
            name="paidStatus"
            required
          />
          <Separator _gap={24} />
          <TextInputField
            name="keterangan"
            label="Keterangan"
            multiline={true}
            rows={3}
          />
          <Separator _gap={24} />
          <button className="invoice-simpan" type="submit">
            SIMPAN
          </button>
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
