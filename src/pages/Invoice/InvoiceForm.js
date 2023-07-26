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
import { Modal, Flex, Text, Paper } from "@mantine/core";
import CustomerForm from "../Customer/CustomerForm";
import DateInputField from "../../components/field/date-input";
import DateInputFieldBasic from "../../components/field/date-input-basic";
import InvoiceTypeSelectInput from "../../components/Select/invoice-type-select-input";
import Separator from "../../components/separator";
import TextInputField from "../../components/field/text-input";
import RadioInputField from "../../components/field/radio-input";
import CollectionSelectInput from "../../components/Select/collection-select-input";
import FittingForm from "./FittingForm";
import { modals } from "@mantine/modals";
import ImagesInputField from "../../components/field/image";
import { ImagePlaceholder } from "../../assets/svg";
import { urlPattern } from "../../utils/regex";
import { getUrlImage } from "../../utils/image-function";
import {
  createFitting,
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
  getDetailInvoiceItems,
  updateDetailInvoiceItem,
} from "../../services/detail-invoice-item";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import useYupValidationResolver from "../../hooks/use-yup-resolver";
import { getExpensesByIdInvoice } from "../../services/expense";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import DetailButton from "../../components/DetailButton";
import ExpenseForm from "../Expense/ExpenseForm";
import TextInputOnChangeField from "../../components/field/text-input-on-change";
import TextInputOnChangeFieldName from "../../components/field/text-input-on-change-name";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";

const typeInvoice = {
  Rent: "rent",
  CustomRent: "custom_rent",
  CustomMade: "custom_made",
};

const IsolatedTotal = () => {
  const { control, setValue, watch } = useFormContext();
  const [items] = useWatch({
    control,
    name: ["items"],
  });
  function currencyFormat(num) {
    return "Rp. " + num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  React.useEffect(() => {
    const total = items.reduce((prev, item) => {
      if (typeof item.harga === "number") {
        const harga = item.harga || 0;
        return prev + harga;
      } else {
        const harga = parseFloat(item.harga || 0);
        return prev + harga;
      }
    }, 0);
    const newTotalValue = total;
    const currentTotalValue = watch("harga_total");
    if (newTotalValue !== currentTotalValue) {
      setValue("harga_total", newTotalValue);
    }
  }, [items, setValue, watch]);
  //   setValue("harga_total", total);
  // }, [items, setValue]);

  const totalValue = watch("harga_total");
  return <span>{currencyFormat(totalValue)}</span>;
};

const IsolatedPanjar = () => {
  const { control, setValue, watch } = useFormContext();
  const [items] = useWatch({
    control,
    name: ["items"],
  });
  const [diskon] = useWatch({
    control,
    name: ["diskon"],
  });
  function currencyFormat(num) {
    return "Rp. " + num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  React.useEffect(() => {
    const total = items.reduce((prev, item) => {
      if (typeof item.harga === "number") {
        const harga = item.harga || 0;
        return prev + harga;
      } else {
        const harga = parseFloat(item.harga || 0);
        return prev + harga;
      }
    }, 0);
    // const diskonValue = watch("diskon");
    const newPanjarValue = (total-diskon) / 2;
    const currentPanjarValue = watch("panjar");
    if (newPanjarValue !== currentPanjarValue) {
      setValue("panjar", newPanjarValue);
    }
    if (!isNaN(newPanjarValue) && newPanjarValue !== currentPanjarValue) {
      setValue("panjar", newPanjarValue);
    }
  }, [diskon, items, setValue, watch]);

  const panjarValue = watch("panjar");
  return <span>Panjar: {currencyFormat(panjarValue)}</span>;
};

const IsolatedDeposit = () => {
  const { control, setValue, watch } = useFormContext();
  const [items] = useWatch({
    control,
    name: ["items"],
  });
  const [diskon] = useWatch({
    control,
    name: ["diskon"],
  });
  const [type] = useWatch({
    control,
    name: ["id_jenis_invoice"],
  });
  function currencyFormat(num) {
    return "Rp. " + num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  React.useEffect(() => {
    const total = items.reduce((prev, item) => {
      if (typeof item.harga === "number") {
        const harga = item.harga || 0;
        return prev + harga;
      } else {
        const harga = parseFloat(item.harga || 0);
        return prev + harga;
      }
    }, 0);
    // const diskonValue = watch("diskon");
    const newDepositValue = total-diskon;
    const currentDepositValue = watch("deposit");
    if (type === "custom_made") setValue("deposit", 0);
    else if (!isNaN(newDepositValue) && newDepositValue !== currentDepositValue) {
      setValue("deposit", newDepositValue);
    }
  }, [items, setValue, watch, type, diskon]);

  const depositValue = watch("deposit");
  return <span>Deposit: {currencyFormat(depositValue)}</span>;
};

const IsolatedTotalPembayaran = () => {
  const { control, setValue, watch } = useFormContext();
  const [items] = useWatch({
    control,
    name: ["items"],
  });
  const [diskon] = useWatch({
    control,
    name: ["diskon"],
  });
  const [biaya_tambahan] = useWatch({
    control,
    name: ["biaya_tambahan"],
  });
  function currencyFormat(num) {
    return "Rp. " + num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  React.useEffect(() => {
    const total = items.reduce((prev, item) => {
      if (typeof item.harga === "number") {
        const harga = item.harga || 0;
        return prev + harga;
      } else {
        const harga = parseFloat(item.harga || 0);
        return prev + harga;
      }
    }, 0);
    // const diskonValue = watch("diskon");
    const newTotalValue = total-parseFloat(diskon)+parseFloat(biaya_tambahan);;
    const currentTotalValue = watch("total_pembayaran");
    if (!isNaN(newTotalValue) && newTotalValue !== currentTotalValue) {
      setValue("total_pembayaran", newTotalValue);
    }
  }, [diskon, biaya_tambahan, items, setValue, watch]);

  const totalValue = watch("total_pembayaran");
  return <span>{currencyFormat(totalValue)}</span>;
};

const Items = ({ isEdit, isFinished }) => {
  const { control, setValue } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    name: "items",
    control,
    keyName: "customId",
  });

  const onClickFitting =
    ({ index, fitting }) =>
    () => {
      modals.open({
        size: 800,
        centered: true,
        withCloseButton: false,
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
        lingkar_leher: "",
        lingkar_badan: "",
        lingkar_badan_atas: "",
        lingkar_pinggang: "",
        lingkar_perut: "",
        lingkar_pinggul: "",
        jarak_dada: "",
        tinggi_dada: "",
        panjang_dada: "",
        panjang_punggung: "",
        panjang_sisi: "",
        lebar_bahu: "",
        lebar_dada: "",
        lebar_punggung: "",
        tinggi_perut: "",
        tinggi_pinggul: "",
        lengan_pendek: "",
        lebar_lengan: "",
        lengan_panjang: "",
        lebar_pergelangan_lengan: "",
        panjang_siku: "",
        panjang_rok: "",
        lebar_kerung_lengan: "",
      },
    });
  };

  const removeItem = (index) => () => {
    remove(index);
  };

  //tracking total
  const [type] = useWatch({
    control,
    name: ["id_jenis_invoice"],
  });

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
              {type === typeInvoice.Rent ? (
                <>
                  <CollectionSelectInput
                    name={`items[${index}].id_collection`}
                    style={{ flex: 5, marginRight: 20 }}
                    disabled={isEdit}
                    onAfterChangeDetail={(value) => {
                      if (!field?.gambar_sketsa) {
                        setValue(`items[${index}].gambar_sketsa`, [
                          value?.extra?.gambar,
                        ]);
                      }
                      setValue(`items[${index}].harga`, value?.extra?.harga);
                      setValue(`items[${index}].id_collection`, value?.value);
                    }}
                  />

                  <TextInputField
                    name={`items[${index}].harga`}
                    label="Harga"
                    style={{ flex: 5, marginRight: 20 }}
                    disabled={true}
                  />
                </>
              ) : (
                <>
                  <TextInputOnChangeFieldName
                    name={`items[${index}].nama_item`}
                    label="Collection"
                    style={{ flex: 5, marginRight: 20 }}
                    disabled={isEdit}
                    value={fields[index].nama_item}
                    onChange={(e) => {
                      update(index, {
                        ...fields[index],
                        nama_item: e.target.value,
                      });
                    }}
                  />
                  <TextInputOnChangeField
                    name={`items[${index}].harga`}
                    label="Harga"
                    style={{ flex: 5 }}
                    disabled={isEdit}
                    value={fields[index].harga !== "" ? fields[index].harga : 0}
                    onChange={(e) => {
                      const inputHarga = e.target.value;
                      let newHarga = 0;

                      if (inputHarga !== "") {
                        newHarga = parseFloat(inputHarga);
                        if (isNaN(newHarga)) {
                          newHarga =
                            fields[index].harga !== ""
                              ? fields[index].harga
                              : 0;
                        }
                      }

                      update(index, { ...fields[index], harga: newHarga });
                    }}
                  />
                </>
              )}
              {isFinished ? (
                <></>
              ) : (
                <button
                  className="item-fitting-button"
                  onClick={onClickFitting({ index, fitting: field.fitting })}
                  type="button"
                >
                  <i class="fa fa-pencil fa-2x"></i>
                </button>
              )}
              <Separator _gap={24} />
              <ImagesInputField
                label={type === typeInvoice.Rent ? "Pratinjau :" : "Sketsa :"}
                placeholder={<ImagePlaceholder size="56" />}
                name={`items[${index}].gambar_sketsa`}
                width={56}
                height={56}
                isHide
                isFinished={isFinished ? isFinished : type === typeInvoice.Rent}
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
      {/* </div> */}
    </>
  );
};

const IsolatedForm = ({
  data,
  items,
  isSuccess,
  isSuccessExpense,
  isFetchingDetailItems,
  isFetchingFitting,
  dataDetailItems,
  id,
  dataFitting,
  dataExpense,
  setItems,
  setIsInitiate,
  isEdit,
  isInitiate,
  isFinished,
  setIsFinished,
}) => {
  const defaultValues = React.useMemo(
    () => ({
      id: data?.invoice.id,
      id_customer: data?.invoice.id_customer,
      id_jenis_invoice: data?.invoice.id_jenis_invoice,
      tanggal_acara: data?.invoice.tanggal_acara.toDate() || new Date(),
      diskon: data?.invoice.diskon || 0,
      biaya_tambahan: data?.invoice.biaya_tambahan || 0,
      harga_total: data?.invoice.harga_total,
      total_pembayaran: data?.invoice.total_pembayaran,
      panjar: data?.invoice.panjar,
      deposit: data?.invoice.deposit,
      status_pelunasan: data?.invoice.status_pelunasan,
      keterangan: data?.invoice.keterangan,
      waktu_buat: data?.invoice.waktu_buat || new Date(),
      waktu_ubah: data?.invoice.waktu_ubah.toDate() || new Date(),
      waktu_lunas: data?.invoice.waktu_lunas?.toDate() || null,
      items: items,
    }),
    [data, items]
  );

  React.useEffect(() => {
    if (
      isSuccess &&
      !isFetchingDetailItems &&
      !isFetchingFitting &&
      isSuccessExpense
    ) {
      const items = [];
      dataDetailItems.data
        .filter((items) => items.id_invoice === id)
        .map((item) => {
          const fitting = dataFitting.data.find((fit) => {
            return item.id_fitting === fit.id;
          });
          const detailItem = {
            ...item,
            fitting,
            gambar_sketsa: [item.gambar_sketsa],
          };
          items.push(detailItem);
        });
      if (data?.invoice.status_pelunasan === "Selesai") {
        setIsFinished(true);
      }
      setItems(items);
      setIsInitiate(true);
    }
  }, [isSuccess, isFetchingDetailItems, isFetchingFitting, isSuccessExpense]);

  const navigate = useNavigate();

  const [openedCustomer, { open: openCustomer, close: closeCustomer }] =
    useDisclosure(false);

  const [openedFitting, { open: openFitting, close: closeFitting }] =
    useDisclosure(false);

  const [openedExpense, { open: openExpense, close: closeExpense }] =
    useDisclosure(false);

  const [openConfirmationDialog, { open: openConfirm, close: closeConfirm }] =
    useDisclosure(false);

  const [currentDataExpense, setCurrentDataExpense] = React.useState({
    tanggal: new Date(),
    nominal: 0,
    keterangan: "",
    id_invoice: "",
  });
  const [isEditExpense, setIsEditExpense] = React.useState(false);

  const onSubmit = React.useCallback(
    async (values) => {
      const tanggal_acara = new Date(values.tanggal_acara);
      tanggal_acara.setHours(7, 0, 0, 0);
      const waktu_ubah = new Date(values.waktu_ubah);
      waktu_ubah.setHours(7, 0, 0, 0);
      const waktu_lunas = values.waktu_lunas
        ? new Date(values.waktu_lunas)
        : null;
      if (waktu_lunas) waktu_lunas.setHours(7, 0, 0, 0);
      try {
        const invoice = {
          id_customer: values.id_customer,
          id_jenis_invoice: values.id_jenis_invoice,
          tanggal_acara: tanggal_acara,
          diskon: values.diskon,
          biaya_tambahan: values.biaya_tambahan,
          harga_total: values.harga_total,
          total_pembayaran: values.total_pembayaran,
          panjar: values.panjar,
          deposit: values.deposit,
          status_pelunasan: values.status_pelunasan,
          keterangan: values.keterangan,
          waktu_buat: defaultValues.waktu_buat,
          waktu_ubah: waktu_ubah,
          waktu_lunas: waktu_lunas,
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
        if (!isEdit) {
          const invoiceDoc = createInvoice({
            id_customer: invoice.id_customer,
            id_jenis_invoice: invoice.id_jenis_invoice,
            tanggal_acara: Timestamp.fromDate(invoice.tanggal_acara),
            diskon: values.diskon,
            biaya_tambahan: invoice.biaya_tambahan,
            harga_total: invoice.harga_total,
            total_pembayaran: invoice.total_pembayaran,
            panjar: invoice.panjar,
            deposit: invoice.deposit,
            // status_pelunasan: invoice.status_pelunasan,
            status_pelunasan: "Belum Lunas",
            keterangan: invoice.keterangan ?? "-",
            waktu_buat: invoice.waktu_buat,
            waktu_ubah: invoice.waktu_ubah,
            waktu_lunas: null,
          });
          invoiceDoc.then((idInvoice) => {
            fittings.map((fitting, index) => {
              const fittingDoc = createFitting({
                lingkar_leher: fitting.lingkar_leher,
                lingkar_badan: fitting.lingkar_badan,
                lingkar_badan_atas: fitting.lingkar_badan_atas,
                lingkar_pinggang: fitting.lingkar_pinggang,
                lingkar_perut: fitting.lingkar_perut,
                lingkar_pinggul: fitting.lingkar_pinggul,
                jarak_dada: fitting.jarak_dada,
                tinggi_dada: fitting.tinggi_dada,
                panjang_dada: fitting.panjang_dada,
                panjang_punggung: fitting.panjang_punggung,
                panjang_sisi: fitting.panjang_sisi,
                lebar_bahu: fitting.lebar_bahu,
                lebar_dada: fitting.lebar_dada,
                lebar_punggung: fitting.lebar_punggung,
                tinggi_perut: fitting.tinggi_perut,
                tinggi_pinggul: fitting.tinggi_pinggul,
                lengan_pendek: fitting.lengan_pendek,
                lebar_lengan: fitting.lebar_lengan,
                lengan_panjang: fitting.lengan_panjang,
                lebar_pergelangan_lengan: fitting.lebar_pergelangan_lengan,
                panjang_siku: fitting.panjang_siku,
                panjang_rok: fitting.panjang_rok,
                lebar_kerung_lengan: fitting.lebar_kerung_lengan,
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
          updateInvoice(id, {
            id_customer: invoice.id_customer,
            id_jenis_invoice: invoice.id_jenis_invoice,
            tanggal_acara: Timestamp.fromDate(invoice.tanggal_acara),
            diskon: values.diskon,
            biaya_tambahan: invoice.biaya_tambahan,
            harga_total: invoice.harga_total,
            total_pembayaran: invoice.total_pembayaran,
            panjar: invoice.panjar,
            deposit: invoice.deposit,
            // status_pelunasan: invoice.status_pelunasan,
            status_pelunasan:
              invoice.waktu_lunas !== null &&
              invoice.status_pelunasan === "Belum Lunas"
                ? "Lunas"
                : invoice.status_pelunasan,
            keterangan: invoice.keterangan ?? "-",
            waktu_buat: invoice.waktu_buat,
            waktu_ubah: Timestamp.fromDate(new Date()),
            // waktu_lunas: Timestamp.fromDate(new Date(invoice.waktu_lunas)) ?? null,
            waktu_lunas:
              invoice.waktu_lunas !== null
                ? Timestamp.fromDate(invoice.waktu_lunas)
                : invoice.waktu_lunas,
          });

          fittings.map(async (fitting, index) => {
            updateFitting(defaultValues?.items[index].id_fitting, {
              lingkar_leher: fitting.lingkar_leher,
              lingkar_badan: fitting.lingkar_badan,
              lingkar_badan_atas: fitting.lingkar_badan_atas,
              lingkar_pinggang: fitting.lingkar_pinggang,
              lingkar_perut: fitting.lingkar_perut,
              lingkar_pinggul: fitting.lingkar_pinggul,
              jarak_dada: fitting.jarak_dada,
              tinggi_dada: fitting.tinggi_dada,
              panjang_dada: fitting.panjang_dada,
              panjang_punggung: fitting.panjang_punggung,
              panjang_sisi: fitting.panjang_sisi,
              lebar_bahu: fitting.lebar_bahu,
              lebar_dada: fitting.lebar_dada,
              lebar_punggung: fitting.lebar_punggung,
              tinggi_perut: fitting.tinggi_perut,
              tinggi_pinggul: fitting.tinggi_pinggul,
              lengan_pendek: fitting.lengan_pendek,
              lebar_lengan: fitting.lebar_lengan,
              lengan_panjang: fitting.lengan_panjang,
              lebar_pergelangan_lengan: fitting.lebar_pergelangan_lengan,
              panjang_siku: fitting.panjang_siku,
              panjang_rok: fitting.panjang_rok,
              lebar_kerung_lengan: fitting.lebar_kerung_lengan,
            });

            const fileUrl = urlPattern.test(
              detailInvoice[index].gambar_sketsa[0]
            )
              ? detailInvoice[index].gambar_sketsa[0]
              : await getUrlImage({
                  file: detailInvoice[index].gambar_sketsa[0],
                });
            updateDetailInvoiceItem(defaultValues?.items[index].id, {
              id_invoice: id,
              id_collection: detailInvoice[index].id_collection
                ? detailInvoice[index].id_collection
                : "",
              id_fitting: defaultValues?.items[index].id_fitting,
              nama_item: detailInvoice[index].nama_item
                ? detailInvoice[index].nama_item
                : "",
              harga: parseInt(detailInvoice[index].harga),
              gambar_sketsa: fileUrl,
            });
          });

          notifications.show({
            title: "Update Invoice",
            message: "Invoice telah berhasil diupdate",
            color: "teal",
          });
        }
      } catch (e) {
        console.log(e.messages);
      } finally {
        navigate(-1);
      }
    },
    [defaultValues?.items, id, isEdit, navigate]
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
          .required("Harap diisi")
          .integer()
          .typeError("Wajib diisi dengan Angka"),
        panjar: Yup.number()
          .required("Harap diisi")
          .integer()
          .typeError("Wajib diisi dengan Angka"),
        deposit: Yup.number()
          .required("Harap diisi")
          .integer()
          .typeError("Wajib diisi dengan Angka"),
        diskon: Yup.number()
          .required("Harap diisi")
          .integer()
          .typeError("Wajib diisi dengan Angka"),
        biaya_tambahan: Yup.number()
          .required("Harap diisi")
          .integer()
          .typeError("Wajib diisi dengan Angka"),
        // status_pelunasan: Yup.string().required(
        //   "Harap pilih Status Pelunasan terlebih dahulu"
        // ),
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

  const onClickAddExpense = React.useCallback(() => {
    setCurrentDataExpense({
      tanggal: new Date(),
      nominal: 0,
      keterangan: "",
      id_invoice: id,
    });
    setIsEditExpense(false);
    openExpense();
  }, [id, openExpense]);

  const onClickDoneInvoice = () => {
    const updatedInvoice = {
      ...defaultValues,
      status_pelunasan: "Selesai",
    };
    onSubmit(updatedInvoice);
  };

  function currencyFormat(num) {
    return "Rp. " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const columns = [
    {
      field: "tanggal",
      headerName: "Tanggal",
      minWidth: 100,
      flex: 1,
      renderCell: ({ row }) => {
        return <>{dayjs(row.tanggal).format("DD/MM/YYYY")}</>;
      },
    },
    {
      field: "nominal",
      headerName: "Nominal",
      minWidth: 200,
      flex: 1,
      renderCell: ({ row }) => {
        function currencyFormat(num) {
          return (
            "Rp. " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
          );
        }
        return <>{currencyFormat(row.nominal)}</>;
      },
    },
    { field: "keterangan", headerName: "Keterangan", minWidth: 300, flex: 2 },
    {
      field: "action",
      headerName: "Action",
      minWidth: 50,
      flex: 0.5,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      renderCell: ({ row }) => {
        const onClick = () => {
          setCurrentDataExpense({
            tanggal: row.tanggal,
            nominal: row.nominal,
            keterangan: row.keterangan,
            id_invoice: row.id_invoice,
            bukti: row.bukti,
            id: row.id,
          });
          openExpense();
          setIsEditExpense(true);
        };
        return <DetailButton onClick={onClick} />;
      },
    },
  ];

  return (
    <div className="invoice-form-container">
      <div className="invoice-form">
        <AdminTitle props={id ? `Invoice ${id}` : "Invoice"} />
        <BackButton />
        <div className="invoice-form-content card-container">
          {!isInitiate && isEdit ? (
            <></>
          ) : (
            <Form onSubmit={onSubmit} methods={methods}>
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
                  disabled={isFinished ? true : false}
                  onChangeExtend={
                    !isEdit
                      ? () => {
                          methods.setValue("items", []);
                        }
                      : () => {}
                  }
                />
                <div style={{ flex: 1 }}>
                  <DateInputField
                    name="tanggal_acara"
                    label="Tanggal Acara"
                    disabled={isFinished}
                  />
                </div>
              </div>
              <Separator _gap={12} />
              <Items isEdit={isEdit} isFinished={isFinished} />
              <div style={{ display: "flex", height: "auto" }}>
                {/* <IsolatedTotal /> */}
                {/* <IsolatedPanjar /> */}
                {/* <IsolatedDeposit /> */}
                {/* <TextInputField
                  name="deposit"
                  label="Deposit"
                  style={{ flex: 1 }}
                  disabled={isFinished}
                /> */}
              </div>
              <Divider style={{ margin: "8px 0 16px" }} />
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flex: 3,
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <span style={{ flex: 1 }}>
                      <IsolatedPanjar />
                    </span>
                    <span style={{ flex: 1 }}>
                      <IsolatedDeposit />
                    </span>
                  </div>
                  {isEdit ? (
                    <>
                      <div>
                        <strong style={{ marginRight: "8px" }}>
                          Sisa Pembayaran:
                        </strong>
                        {currencyFormat(
                          defaultValues.total_pembayaran - defaultValues.panjar
                        )}
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <strong style={{ marginRight: "8px" }}>
                          Tanggal Lunas:
                        </strong>
                        {defaultValues.status_pelunasan === "Belum Lunas" ? (
                          <DateInputFieldBasic name="waktu_lunas" />
                        ) : (
                          <span>
                            {dayjs(defaultValues.waktu_lunas).format(
                              "DD/MM/YYYY"
                            )}
                          </span>
                        )}
                      </div>
                      {isFinished ? (
                        <div>
                          <strong style={{ marginRight: "8px" }}>
                            Tanggal Selesai:
                          </strong>
                          {dayjs(defaultValues.waktu_ubah).format("DD/MM/YYYY")}
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    flex: 2,
                    fontWeight: "bold",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <span>Subtotal:</span>
                    <span style={{ flex: 1, textAlign: "right" }}>
                      <IsolatedTotal />
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center"  }}>
                    <span>Diskon:</span>
                    <span style={{ flex: 1, display:"flex", justifyContent:"right", alignItems:"center"}}>
                      <span style={{marginRight:"8px"}}>-</span> 
                      {!isEdit ? (
                          <TextInputField
                          name="diskon"
                          disabled={isFinished}
                          size="small"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          />
                        ) : (
                          <span style={{textAlign: "right" }}>
                            {currencyFormat(defaultValues.diskon)}
                          </span>
                        )}
                      {/* <TextInputField
                        name="diskon"
                        disabled={isFinished}
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      /> */}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span>Biaya Tambahan:</span>
                    <span style={{ flex: 1, textAlign: "right" }}>
                      <TextInputField
                        name="biaya_tambahan"
                        // label="Biaya Tambahan"
                        disabled={isFinished}
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </span>
                  </div>
                  <Divider />
                  <div style={{ display: "flex", fontSize: "18px" }}>
                    <span>Total Pembayaran:</span>
                    <span style={{ flex: 1, textAlign: "right" }}>
                      <IsolatedTotalPembayaran />
                    </span>
                  </div>
                </div>
              </div>
              <Separator _gap={24} />
              {/* <TextInputField
                name="biaya_tambahan"
                label="Biaya Tambahan"
                disabled={isFinished}
              /> */}
              {/* <Separator _gap={12} />
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
                disabled={isFinished}
              /> */}
              {/* <Separator _gap={24} /> */}
              {id ? (
                <>
                  <p>
                    <strong>List Pengeluaran:</strong>
                    <button
                      style={{ width: 50, marginLeft: 12 }}
                      type="button"
                      onClick={onClickAddExpense}
                    >
                      +
                    </button>
                  </p>
                  {dataExpense.expenses.length === 0 ? (
                    <>
                      Tidak ada pengeluaran untuk invoice ini
                      <Separator _gap={24} />
                    </>
                  ) : (
                    <DataGrid
                      rows={dataExpense.expenses}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                      }}
                      style={{ border: "none" }}
                    />
                  )}
                </>
              ) : (
                <></>
              )}
              <Separator _gap={24} />
              <TextInputField
                name="keterangan"
                label="Keterangan"
                multiline={true}
                rows={3}
                disabled={isFinished}
              />
              <Separator _gap={24} />
              {isFinished ? (
                <></>
              ) : (
                <span
                  style={{
                    width: "100%",
                    display: "flex",
                    gap: "32px",
                    justifyContent: "end",
                  }}
                >
                  {defaultValues.status_pelunasan === "Lunas" ? (
                    <button
                      className="invoice-selesai"
                      type="button"
                      onClick={openConfirm}
                    >
                      SELESAI
                    </button>
                  ) : (
                    <></>
                  )}
                  <button className="invoice-simpan" type="submit">
                    SIMPAN
                  </button>
                </span>
              )}
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
          opened={openedExpense}
          centered
          onClose={closeExpense}
          withCloseButton={false}
          size={800}
        >
          <ExpenseForm
            data={currentDataExpense}
            onClose={closeExpense}
            isEdit={isEditExpense}
          />
        </Modal>
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
                Apakah kamu yakin ingin mengubah invoice ini menjadi{" "}
                <b>SELESAI</b>? Setelah selesai, invoice tidak dapat diganti
                lagi.
              </Text>
              <Separator _gap={24} />
              <Flex justify="flex-end">
                <Button variant="text" color="error" onClick={closeConfirm}>
                  Tidak
                </Button>
                <Button variant="text" onClick={onClickDoneInvoice}>
                  Ya
                </Button>
              </Flex>
            </Flex>
          </Paper>
        </Modal>
      </div>
    </div>
  );
};

const InvoiceForm = () => {
  const { id } = useParams();
  const { data, isSuccess } = useQuery(
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
  const { data: dataExpense, isSuccess: isSuccessExpense } = useQuery(
    ["get-expenses-by-id-invoice", id],
    () => getExpensesByIdInvoice(id || ""),
    { enabled: !!id }
  );
  const [items, setItems] = React.useState([]);
  const [isInitiate, setIsInitiate] = React.useState(false);
  const [isFinished, setIsFinished] = React.useState(false);
  const isEdit = id ? true : false;

  return (
    <IsolatedForm
      data={data}
      dataDetailItems={dataDetailItems}
      dataFitting={dataFitting}
      dataExpense={dataExpense}
      id={id}
      isEdit={isEdit}
      isFinished={isFinished}
      isFetchingDetailItems={isFetchingDetailItems}
      isFetchingFitting={isFetchingFitting}
      isInitiate={isInitiate}
      isSuccess={isSuccess}
      isSuccessExpense={isSuccessExpense}
      items={items}
      setIsInitiate={setIsInitiate}
      setIsFinished={setIsFinished}
      setItems={setItems}
      key={isInitiate ? "enabled" : "disabled"}
    />
  );
};

export default InvoiceForm;
