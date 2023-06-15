import "./InvoiceForm.css";
import * as React from "react";
import AdminTitle from "../../components/AdminTitle/AdminTitle";
import BackButton from "../../components/BackButton";
import Form from "../../components/field/form";
import {
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import CustomerSelectInput from "../../components/Select/customer-select-input";
import { useDisclosure } from "@mantine/hooks";
import { Image, Modal } from "@mantine/core";
import CustomerForm from "../Customer/CustomerForm";
import DateInputField from "../../components/field/date-input";
import InvoiceTypeSelectInput from "../../components/Select/invoice-type-select-input";
import Separator from "../../components/separator";
import TextInputField from "../../components/field/text-input";
import RadioInputField from "../../components/field/radio-input";
import CollectionSelectInput from "../../components/Select/collection-select-input";
import FittingForm from "./FittingForm";
import CollectionForm from "../Collections/CollectionForm";
import { modals } from "@mantine/modals";
import ImagesInputField from "../../components/field/image";
import images from "../../assets/png/index";
import { ImagePlaceholder } from "../../assets/svg";
import { urlPattern } from "../../utils/regex";
import { getUrlImage } from "../../utils/image-function";

const typeInvoice = {
  Rent: "rent",
  CustomRent: "custom_rent",
  CustomMade: "custom_made",
};

const Items = ({ onClickAddCollection }) => {
  const { control, setValue } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    name: "items",
    control,
    keyName: "customId",
  });
  const [type] = useWatch({
    control,
    name: ["id_jenis_invoice"],
  });

  const onClickFitting =
    ({ index, fitting }) =>
    () => {
      modals.open({
        size: 800,
        centered: true,
        children: (
          <FittingForm
            fitting={fitting}
            onClose={modals.closeAll}
            onSubmitForm={(values) => {
              update(index, {
                ...fields[index],
                fitting: { ...fields[index].fitting, ...values },
              });
            }}
          />
        ),
      });
    };

  const addItem = () => {
    append({
      // id_invoice: "",
      id_detail_invoice_item: "",
      id_collection: "",
      nama_item: "",
      harga: 0,
      gambar_sketsa: "",
      fitting: {
        id_fitting: "",
        lingkarLeher: "",
        panjangDada: "",
        lenganPendek: "",
        lingkarBadan: "",
        panjangPunggung: "",
        lebarLengan: "",
        lingkarBadanAtas: "",
        panjangSisi: "",
        lenganPanjang: "",
        lingkarPinggang: "",
        lebarBahu: "",
        lebarPergelanganLengan: "",
        lingkarPerut: "",
        lebarDada: "",
        panjangSiku: "",
        lingkarPinggul: "",
        lebarPunggung: "",
        panjangRok: "",
        jarakDada: "",
        tinggiPerut: "",
        lebarKerungLengan: "",
        tinggiDada: "",
        tinggiPinggul: "",
      },
    });
  };

  const removeItem = (index) => () => {
    remove(index);
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>
          <strong>List Barang:</strong>
        </p>
        <button className="invoice-form-item-add" onClick={addItem}>
          TAMBAH BARANG
        </button>
      </div>
      <Separator _gap={12} />
      {fields.map((field, index) => {
        return (
          <>
            <div key={index} style={{ display: "flex", height: "auto" }}>
              {type === typeInvoice.CustomMade ? (
                <TextInputField
                  name={`items[${index}].nama_item`}
                  label="Collection"
                  placeholder="Pilih Collection"
                />
              ) : (
                <CollectionSelectInput
                  name="id_collection"
                  style={{ flex: 5 }}
                  onAfterChangeDetail={(value) => {
                    setValue(`items[${index}].nama_item`, value?.label);
                    setValue(`items[${index}].gambar_sketsa`, [
                      value?.extra?.gambar,
                    ]);
                  }}
                />
              )}
              <button
                className="add-collection-button"
                onClick={onClickAddCollection}
              >
                +
              </button>
              <TextInputField
                name={`items[${index}].harga`}
                label="Harga"
                style={{ flex: 5 }}
              />
              <button
                className="item-fitting-button"
                onClick={onClickFitting({ index, fitting: field.fitting })}
              >
                <i class="fa fa-pencil fa-2x"></i>
              </button>
              <Separator _gap={24} />
              <ImagesInputField
                label="Pertinjau :"
                placeholder={<ImagePlaceholder size="56" />}
                name={`items[${index}].gambar_sketsa`}
                width={56}
                height={56}
                isHide
              />
              <button
                className="item-delete-button"
                onClick={removeItem(index)}
              >
                <i class="fa fa-trash fa-2x"></i>
              </button>
            </div>
            <Separator _gap={24} />
          </>
        );
      })}
    </>
  );
};

const InvoiceForm = () => {
  const defaultValues = React.useMemo(
    () => ({
      id_invoice: "",
      id_customer: "",
      id_jenis_invoice: "",
      tanggal_acara: new Date(),
      biaya_tambahan: 0,
      harga_total: 0,
      panjar: 0,
      deposit: 0,
      status_pelunasan: "",
      keterangan: "",
      waktu_buat: new Date(),
      waktu_ubah: new Date(),
      items: [
        {
          // id_invoice: "",
          id_detail_invoice_item: "",
          id_collection: "",
          nama_item: "",
          harga: 0,
          gambar_sketsa: "",
          fitting: {
            id_fitting: "",
            lingkarLeher: "",
            panjangDada: "",
            lenganPendek: "",
            lingkarBadan: "",
            panjangPunggung: "",
            lebarLengan: "",
            lingkarBadanAtas: "",
            panjangSisi: "",
            lenganPanjang: "",
            lingkarPinggang: "",
            lebarBahu: "",
            lebarPergelanganLengan: "",
            lingkarPerut: "",
            lebarDada: "",
            panjangSiku: "",
            lingkarPinggul: "",
            lebarPunggung: "",
            panjangRok: "",
            jarakDada: "",
            tinggiPerut: "",
            lebarKerungLengan: "",
            tinggiDada: "",
            tinggiPinggul: "",
          },
        },
      ],
    }),
    []
  );

  const [openedCustomer, { open: openCustomer, close: closeCustomer }] =
    useDisclosure(false);

  const [openedCollection, { open: openCollection, close: closeCollection }] =
    useDisclosure(false);

  const [openedFitting, { open: openFitting, close: closeFitting }] =
    useDisclosure(false);

  const onSubmit = React.useCallback(async (values) => {
    try {
      // data invoice
      const invoice = {
        id_customer: values.id_customer,
        id_jenis_invoice: values.id_jenis_invoice,
        tanggal_acara: values.tanggal_acara,
        biaya_tambahan: values.biaya_tambahan,
        harga_total: values.harga_total,
        panjar: values.panjar,
        deposit: values.deposit,
        status_pelunasan: values.status_pelunasan,
        keterangan: values.keterangan,
        waktu_buat: values.waktu_buat,
        waktu_ubah: values.waktu_ubah,
      };

      //data image
      const images = values.items.map((item) => item.gambar_sketsa).flat();
      // WARNING!!!!
      // images.map(async (image) => {
      //   if (urlPattern.test(image)) {
      //     //if true dont submit to storage
      //   } else {
      //     //if false needed submit to storage
      //     await getUrlImage({
      //       file: image,
      //     });
      //   }
      // });

      // data fittings
      const fittings = values.items.map((item) => {
        const hasFitting = !!Object.keys(item.fitting)
          .map((key) => item.fitting[key])
          .filter((value) => !!value).length;
        return {
          ...item.fitting,
          hasFitting,
        };
      });

      // Add a new document with a generated id.
      // const docRef = await addDoc(collection(db, "cities"), {
      //   name: "Tokyo",
      //   country: "Japan"
      // });
      // console.log("Document written with ID: ", docRef.id);

      const detailInvoice = values.items.map((item) => ({
        ...item,
        id_invoice: "", //insert the submitted invoice id
        id_collection:
          values.id_jenis_invoice === typeInvoice.CustomMade
            ? ""
            : item.id_jenis_invoice,
        id_fitting: "", //insert the submitted fitting id
        gambar_sketsa: "", //insert the submitted images url
      }));
    } catch (e) {
      console.log(e.messages);
    } finally {
    }
  }, []);

  const methods = useForm({
    defaultValues,
    // resolver,
    mode: "onChange",
  });

  const onClickAddCustomer = React.useCallback(() => {
    openCustomer();
  }, [openCustomer]);

  const onClickAddCollection = React.useCallback(() => {
    openCollection();
  }, [openCollection]);

  const onClickOpenFitting = React.useCallback(() => {
    openFitting();
  }, [openFitting]);

  return (
    <div className="invoice-form">
      <AdminTitle props={"Invoice"} />
      <BackButton />
      <div className="invoice-form-content">
        <Form onSubmit={onSubmit} methods={methods}>
          <div style={{ display: "flex", height: "auto" }}>
            <CustomerSelectInput style={{ flex: "70" }} name="id_customer" />
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
              name="id_jenis_invoice"
              style={{ marginTop: 8, marginRight: 20 }}
            />
            <DateInputField name="tanggal_acara" label="Tanggal Acara" />
          </div>
          <Separator _gap={12} />
          <Items onClickAddCollection={onClickAddCollection} />
          <div style={{ display: "flex", height: "auto" }}>
            <TextInputField
              name="harga_total"
              label="Total"
              style={{ flex: 1, marginRight: 20 }}
            />
            <TextInputField
              name="panjar"
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
          <TextInputField name="biaya_tambahan" label="Biaya Tambahan" />
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
            name="status_pelunasan"
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
      <Modal
        opened={openedCollection}
        centered
        onClose={closeCollection}
        withCloseButton={false}
        size={1200}
      >
        <CollectionForm onClose={closeCollection} />
      </Modal>
      <Modal
        opened={openedFitting}
        centered
        onClose={closeFitting}
        withCloseButton={false}
        size={800}
      >
        <FittingForm onClose={closeFitting} />
      </Modal>
    </div>
  );
};

export default InvoiceForm;
