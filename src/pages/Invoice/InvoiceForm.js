import "./InvoiceForm.css";
import * as React from "react";
import * as Yup from "yup";
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
import {
  createFitting,
  getFitting,
  getFittings,
  updateFitting,
} from "../../services/fitting";
import {
  createInvoice,
  getInvoice,
  updateInvoice,
} from "../../services/invoice";
import {
  createDetailInvoiceItem,
  getDetailInvoiceItem,
  getDetailInvoiceItemByIdInvoice,
  getDetailInvoiceItems,
  updateDetailInvoiceItem,
} from "../../services/detail-invoice-item";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import useYupValidationResolver from "../../hooks/use-yup-resolver";

const typeInvoice = {
  Rent: "rent",
  CustomRent: "custom_rent",
  CustomMade: "custom_made",
};

const Items = ({ onClickAddCollection, isEdit }) => {
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
      id_invoice: "",
      id_detail_invoice_item: "",
      id_collection: "",
      nama_item: "",
      harga: 0,
      gambar_sketsa: "",
      fitting: {
        id_fitting: "",
        lingkarLeher: "",
        lingkarBadan: "",
        lingkarBadanAtas: "",
        lingkarPinggang: "",
        lingkarPerut: "",
        lingkarPinggul: "",
        jarakDada: "",
        tinggiDada: "",
        panjangDada: "",
        panjangPunggung: "",
        panjangSisi: "",
        lebarBahu: "",
        lebarDada: "",
        lebarPunggung: "",
        tinggiPerut: "",
        tinggiPinggul: "",
        lenganPendek: "",
        lebarLengan: "",
        lenganPanjang: "",
        lebarPergelanganLengan: "",
        panjangSiku: "",
        panjangRok: "",
        lebarKerungLengan: "",
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
        {isEdit ? (
          <></>
        ) : (
          <button
            className="invoice-form-item-add"
            onClick={addItem}
            type="button"
          >
            TAMBAH BARANG
          </button>
        )}
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
                  style={{ flex: 5, marginRight: 20 }}
                />
              ) : (
                <CollectionSelectInput
                  name={`items[${index}].id_collection`}
                  style={{ flex: 5, marginRight: 20 }}
                  // onAfterChangeDetail={(value) => {
                  //   setValue(`items[${index}].id_collection`, value?.value);
                  //   setValue(`items[${index}].gambar_sketsa`, [
                  //     value?.extra?.gambar,
                  //   ]);
                  // }}
                />
              )}
              {isEdit ? (
                <></>
              ) : (
                <button
                  className="add-collection-button"
                  onClick={onClickAddCollection}
                  type="button"
                >
                  +
                </button>
              )}
              <TextInputField
                name={`items[${index}].harga`}
                label="Harga"
                style={{ flex: 5 }}
              />
              <button
                className="item-fitting-button"
                onClick={onClickFitting({ index, fitting: field.fitting })}
                type="button"
              >
                <i class="fa fa-pencil fa-2x"></i>
              </button>
              <Separator _gap={24} />
              <ImagesInputField
                label="Pratinjau :"
                placeholder={<ImagePlaceholder size="56" />}
                name={`items[${index}].gambar_sketsa`}
                width={56}
                height={56}
                isHide
              />
              {isEdit ? (
                <></>
              ) : (
                <button
                  className="item-delete-button"
                  onClick={removeItem(index)}
                  type="button"
                >
                  <i class="fa fa-trash fa-2x"></i>
                </button>
              )}
            </div>
            <Separator _gap={24} />
          </>
        );
      })}
    </>
  );
};

const InvoiceForm = () => {
  const { id } = useParams();
  const { data, isSuccess, isFetching } = useQuery(
    ["get-invoices", id],
    () => getInvoice(id || ""),
    { enabled: !!id }
  );
  const { data: dataDetailItems, isFetching: isFetchingDetailItems } = useQuery(
    ["get-detail-invoice-items"],
    () => getDetailInvoiceItems()
  );
  const { data: dataFitting, isFetching: isFetchingFitting } = useQuery(
    ["get-fittings"],
    () => getFittings()
  );
  const [items, setItems] = React.useState([]);
  const [isInitiate, setIsInitiate] = React.useState(false);
  const isEdit = id ? true : false;

  const defaultValues = React.useMemo(
    () => ({
      id: data?.invoice.id,
      id_customer: data?.invoice.id_customer,
      id_jenis_invoice: data?.invoice.id_jenis_invoice,
      tanggal_acara: data?.invoice.tanggal_acara.toDate() || new Date(),
      biaya_tambahan: data?.invoice.biaya_tambahan,
      harga_total: data?.invoice.harga_total,
      panjar: data?.invoice.panjar,
      deposit: data?.invoice.deposit,
      status_pelunasan: data?.invoice.status_pelunasan,
      keterangan: data?.invoice.keterangan,
      waktu_buat: data?.invoice.waktu_buat || new Date(),
      waktu_ubah: data?.invoice.waktu_ubah || new Date(),
      items: items,
      // items: [
      //   {
      //     id_invoice: "",
      //     id_detail_invoice_item: "",
      //     id_collection: "",
      //     nama_item: "",
      //     harga: 0,
      //     gambar_sketsa: "",
      //     fitting: {
      //       id_fitting: "",
      //       lingkarLeher: "",
      //       lingkarBadan: "",
      //       lingkarBadanAtas: "",
      //       lingkarPinggang: "",
      //       lingkarPerut: "",
      //       lingkarPinggul: "",
      //       jarakDada: "",
      //       tinggiDada: "",
      //       panjangDada: "",
      //       panjangPunggung: "",
      //       panjangSisi: "",
      //       lebarBahu: "",
      //       lebarDada: "",
      //       lebarPunggung: "",
      //       tinggiPerut: "",
      //       tinggiPinggul: "",
      //       lenganPendek: "",
      //       lebarLengan: "",
      //       lenganPanjang: "",
      //       lebarPergelanganLengan: "",
      //       panjangSiku: "",
      //       panjangRok: "",
      //       lebarKerungLengan: "",
      //     },
      //   },
      // ],
    }),
    [
      data?.invoice.biaya_tambahan,
      data?.invoice.deposit,
      data?.invoice.harga_total,
      data?.invoice.id,
      data?.invoice.id_customer,
      data?.invoice.id_jenis_invoice,
      data?.invoice.keterangan,
      data?.invoice.panjar,
      data?.invoice.status_pelunasan,
      data?.invoice.tanggal_acara,
      data?.invoice.waktu_buat,
      data?.invoice.waktu_ubah,
      items,
    ]
  );

  React.useEffect(() => {
    if (isSuccess && !isFetchingDetailItems && !isFetchingFitting) {
      // getDetailInvoiceItemByIdInvoice(id)
      //   .then((item) => {
      //     return item.items;
      //   })
      //   .then((detailItems) => {
      //     detailItems.map((detailItem, index) => {
      //       getFitting(detailItem.id_fitting)
      //         .then((fittingData) => {
      //           const fitting = fittingData.fitting;
      //           return { ...detailItem, fitting };
      //         })
      //         .then((data) => {
      //           console.log(data);
      //           setItems(data);
      //         });
      //     });
      //   });
      // setIsInitiate(true);
      const items = [];
      dataDetailItems.data
        .filter((items) => items.id_invoice === id)
        .map((item) => {
          const fitting = dataFitting.data.find((fit) => {
            return item.id_fitting === fit.id;
          });
          const detailItem = { ...item, fitting };
          items.push(detailItem);
        });
      setItems(items);
      setIsInitiate(true);
    }
  }, [isSuccess, isFetchingDetailItems, isFetchingFitting]);

  const [openedCustomer, { open: openCustomer, close: closeCustomer }] =
    useDisclosure(false);

  const [openedCollection, { open: openCollection, close: closeCollection }] =
    useDisclosure(false);

  const [openedFitting, { open: openFitting, close: closeFitting }] =
    useDisclosure(false);

  const onSubmit = React.useCallback(
    async (values) => {
      try {
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

        const fittings = values.items.map((item) => {
          const hasFitting = !!Object.keys(item.fitting)
            .map((key) => item.fitting[key])
            .filter((value) => !!value).length;
          return {
            ...item.fitting,
            hasFitting,
          };
        });

        const detailInvoice = values.items.map((item) => ({
          ...item,
        }));

        console.log(invoice, fittings, detailInvoice);
        if (!isEdit) {
          const invoiceDoc = createInvoice({
            id_customer: invoice.id_customer,
            id_jenis_invoice: invoice.id_jenis_invoice,
            tanggal_acara: Timestamp.fromDate(new Date(invoice.tanggal_acara)),
            biaya_tambahan: invoice.biaya_tambahan,
            harga_total: invoice.harga_total,
            panjar: invoice.panjar,
            deposit: invoice.deposit,
            status_pelunasan: invoice.status_pelunasan,
            keterangan: invoice.keterangan,
            waktu_buat: invoice.waktu_buat,
            waktu_ubah: invoice.waktu_ubah,
          });
          invoiceDoc.then((idInvoice) => {
            fittings.map((fitting, index) => {
              const fittingDoc = createFitting({
                lingkar_leher: fitting.lingkarLeher,
                lingkar_badan: fitting.lingkarBadan,
                lingkar_badan_atas: fitting.lingkarBadanAtas,
                lingkar_pinggang: fitting.lingkarPinggang,
                lingkar_perut: fitting.lingkarPerut,
                lingkar_pinggul: fitting.lingkarPinggul,
                jarak_dada: fitting.jarakDada,
                tinggi_dada: fitting.tinggiDada,
                panjang_dada: fitting.panjangDada,
                panjang_punggung: fitting.panjangPunggung,
                panjang_sisi: fitting.panjangSisi,
                lebar_bahu: fitting.lebarBahu,
                lebar_dada: fitting.lebarDada,
                lebar_punggung: fitting.lebarPunggung,
                tinggi_perut: fitting.tinggiPerut,
                tinggi_pinggul: fitting.tinggiPinggul,
                lengan_pendek: fitting.lenganPendek,
                lebar_lengan: fitting.lebarLengan,
                lengan_panjang: fitting.lenganPanjang,
                lebar_pergelangan_lengan: fitting.lebarPergelanganLengan,
                panjang_siku: fitting.panjangSiku,
                panjang_rok: fitting.panjangRok,
                lebar_kerung_lengan: fitting.lebarKerungLengan,
              });
              fittingDoc.then(async (idFitting) => {
                const fileUrl = urlPattern.test(
                  detailInvoice[index].gambar_sketsa[0]
                )
                  ? detailInvoice[index].gambar_sketsa[0]
                  : await getUrlImage({
                      file: detailInvoice[index].gambar_sketsa[0],
                    });
                createDetailInvoiceItem({
                  id_invoice: idInvoice,
                  id_collection: detailInvoice[index].id_collection
                    ? detailInvoice[index].id_collection
                    : "",
                  id_fitting: idFitting,
                  nama_item: detailInvoice[index].nama_item
                    ? detailInvoice[index].nama_item
                    : "",
                  harga: detailInvoice[index].harga,
                  gambar_sketsa: fileUrl,
                });
              });
            });
          });
          notifications.show({
            title: "Tambah Invoice",
            message: "Invoice baru telah berhasil ditambahkan",
            color: "teal",
          });
        } else {
          console.log(defaultValues);
          updateInvoice(id, {
            id_customer: invoice.id_customer,
            id_jenis_invoice: invoice.id_jenis_invoice,
            tanggal_acara: Timestamp.fromDate(new Date(invoice.tanggal_acara)),
            biaya_tambahan: invoice.biaya_tambahan,
            harga_total: invoice.harga_total,
            panjar: invoice.panjar,
            deposit: invoice.deposit,
            status_pelunasan: invoice.status_pelunasan,
            keterangan: invoice.keterangan,
            waktu_buat: invoice.waktu_buat,
            waktu_ubah: invoice.waktu_ubah,
          });

          // fittings.map(async (fitting, index) => {
          //   updateFitting(defaultValues?.items[index].id_fitting, {
          //     lingkar_leher: fitting.lingkarLeher,
          //     lingkar_badan: fitting.lingkarBadan,
          //     lingkar_badan_atas: fitting.lingkarBadanAtas,
          //     lingkar_pinggang: fitting.lingkarPinggang,
          //     lingkar_perut: fitting.lingkarPerut,
          //     lingkar_pinggul: fitting.lingkarPinggul,
          //     jarak_dada: fitting.jarakDada,
          //     tinggi_dada: fitting.tinggiDada,
          //     panjang_dada: fitting.panjangDada,
          //     panjang_punggung: fitting.panjangPunggung,
          //     panjang_sisi: fitting.panjangSisi,
          //     lebar_bahu: fitting.lebarBahu,
          //     lebar_dada: fitting.lebarDada,
          //     lebar_punggung: fitting.lebarPunggung,
          //     tinggi_perut: fitting.tinggiPerut,
          //     tinggi_pinggul: fitting.tinggiPinggul,
          //     lengan_pendek: fitting.lenganPendek,
          //     lebar_lengan: fitting.lebarLengan,
          //     lengan_panjang: fitting.lenganPanjang,
          //     lebar_pergelangan_lengan: fitting.lebarPergelanganLengan,
          //     panjang_siku: fitting.panjangSiku,
          //     panjang_rok: fitting.panjangRok,
          //     lebar_kerung_lengan: fitting.lebarKerungLengan,
          //   });

          //   const fileUrl = urlPattern.test(detailInvoice[index].gambar_sketsa[0])
          //     ? detailInvoice[index].gambar_sketsa[0]
          //     : await getUrlImage({
          //         file: detailInvoice[index].gambar_sketsa[0],
          //       });
          //   updateDetailInvoiceItem(defaultValues?.items[index].id, {
          //     id_invoice: id,
          //     id_collection: detailInvoice[index].id_collection
          //       ? detailInvoice[index].id_collection
          //       : "",
          //     id_fitting: defaultValues?.items[index].id_fitting,
          //     nama_item: detailInvoice[index].nama_item
          //       ? detailInvoice[index].nama_item
          //       : "",
          //     harga: detailInvoice[index].harga,
          //     gambar_sketsa: fileUrl,
          //   });
          // });

          notifications.show({
            title: "Update Invoice",
            message: "Invoice telah berhasil diupdate",
            color: "teal",
          });
        }
      } catch (e) {
        console.log(e.messages);
      } finally {
      }
    },
    [defaultValues, id, isEdit]
  );

  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        id_customer: Yup.string().required(
          "Harap pilih Customer terlebih dahulu"
        ),
        id_jenis_invoice: Yup.string().required(
          "Harap pilih Jenis Invoice terlebih dahulu"
        ),
        tanggal_acara: Yup.date().required(
          "Harap isi Tanggal Acara terlebih dahulu"
        ),
        harga_total: Yup.number()
          .required("Harap diisi (berikan 0 jika tidak ada biaya)")
          .positive("Angka Wajib diatas 0")
          .integer()
          .typeError("Harga Total Wajib diisi dengan Angka"),
        panjar: Yup.number()
          .required("Harap diisi (berikan 0 jika tidak ada biaya)")
          .positive("Angka Wajib diatas 0")
          .integer()
          .typeError("Panjar Wajib diisi dengan Angka"),
        deposit: Yup.number()
          .required("Harap diisi (berikan 0 jika tidak ada biaya)")
          .positive("Angka Wajib diatas 0")
          .integer()
          .typeError("Deposit Wajib diisi dengan Angka"),
        biaya_tambahan: Yup.number()
          .required("Harap diisi (berikan 0 jika tidak ada biaya)")
          .positive("Angka Wajib diatas 0")
          .integer()
          .typeError("Biaya Tambahan Wajib diisi dengan Angka"),
        status_pelunasan: Yup.string().required(
          "Harap pilih Status Pelunasan terlebih dahulu"
        ),
      }),
    []
  );

  const resolver = useYupValidationResolver(yupSchema);

  const methods = useForm({
    defaultValues,
    resolver,
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
    <div className="invoice-form-container">
      <div className="invoice-form">
        <AdminTitle props={"Invoice"} />
        <BackButton />
        <div className="invoice-form-content">
          {!isInitiate && isEdit ? (
            <></>
          ) : (
            <Form onSubmit={onSubmit} methods={methods}>
              {/* {JSON.stringify(defaultValues)}
            {defaultValues.items.map((detail) => {
              return (
                <>
                  <img src={detail.gambar_sketsa}></img>
                </>
              );
            })} */}
              <div style={{ display: "flex", height: "auto" }}>
                <CustomerSelectInput
                  style={{ flex: "70" }}
                  name="id_customer"
                  disabled={isEdit ? true : false}
                />
                {isEdit ? (
                  <></>
                ) : (
                  <button
                    className="invoice-form-customer-add"
                    onClick={onClickAddCustomer}
                    type="button"
                  >
                    + TAMBAH CUSTOMER
                  </button>
                )}
              </div>
              <Separator _gap={12} />
              <div style={{ display: "flex", height: "auto" }}>
                <InvoiceTypeSelectInput
                  name="id_jenis_invoice"
                  style={{ marginTop: 8, marginRight: 20, flex: 1 }}
                  disabled={isEdit ? true : false}
                />
                <div style={{ flex: 1 }}>
                  <DateInputField name="tanggal_acara" label="Tanggal Acara" />
                </div>
              </div>
              <Separator _gap={12} />
              <Items
                onClickAddCollection={onClickAddCollection}
                isEdit={isEdit}
              />
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
                <strong>Status Pelunasan:</strong>
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
          )}
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
    </div>
  );
};

export default InvoiceForm;
