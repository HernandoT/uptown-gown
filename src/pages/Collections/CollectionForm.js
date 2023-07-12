import * as React from "react";
import * as Yup from "yup";
import useYupValidationResolver from "../../hooks/use-yup-resolver";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { Flex, Paper, Text } from "@mantine/core";
import Separator from "../../components/separator";
import Form from "../../components/field/form";
import TextInputField from "../../components/field/text-input";
import ColorSelectInput from "../../components/Select/color-select-input";
import CategorySelectInput from "../../components/Select/category-select-input";
import TypeSelectInput from "../../components/Select/type-select-input";
import RadioInputField from "../../components/field/radio-input";
import ImagesInputField from "../../components/field/image";
import { getUrlImage } from "../../utils/image-function";
import { urlPattern } from "../../utils/regex";
import { v4 } from "uuid";
import { createCollection, updateCollection } from "../../services/collection";
import { notifications } from "@mantine/notifications";
import { Timestamp } from "firebase/firestore";
import SizeSelectInput from "../../components/Select/size-select-input";

const defaultValues = {
  id: "",
  nama: "",
  harga: 0,
  id_warna: "",
  id_kategori: "",
  id_jenis: "",
  id_ukuran: "",
  deskripsi: "",
  status: "",
  gambar: "",
  popular_collection: 0,
};
const CollectionForm = ({ onClose, data = defaultValues, isEdit = false }) => {
  const defaultValues = React.useMemo(() => {
    return {
      nama: data.nama,
      harga: data.harga,
      id_warna: data.id_warna,
      id_kategori: data.id_kategori,
      id_jenis: data.id_jenis,
      id_ukuran: data.id_ukuran,
      deskripsi: data.deskripsi,
      status: data.status,
      gambar: data.gambar ? [data.gambar] : [],
      defaultRef: data.gambar ? data.gambar : `${v4()}.jpeg`,
      popular_collection: data.popular_collection,
    };
  }, [data]);

  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        nama: Yup.string().required("Nama Collection Wajib Diisi"),
        harga: Yup.number()
          .required()
          .positive("Angka Wajib Diatas 0")
          .integer()
          .typeError("Harga Wajib diisi dengan Angka"),
        id_warna: Yup.string().required("Harap pilih Warna terlebih dahulu"),
        id_kategori: Yup.string().required(
          "Harap pilih Kategori terlebih dahulu"
        ),
        id_jenis: Yup.string().required("Harap pilih Jenis terlebih dahulu"),
        id_ukuran: Yup.string().required("Harap pilih Ukuran terlebih dahulu"),
        deskripsi: Yup.string().required("Deskripsi Wajib Diisi"),
        status: Yup.string().required(
          "Harap pilih Status Ketersediaan terlebih dahulu"
        ),
        gambar: Yup.array().min(1),
        defaultRef: Yup.string().strip(true),
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
      const date = new Date();
      date.setHours(7, 0, 0, 0);
      try {
        //if still url don't submit to firebase
        const fileUrl = urlPattern.test(values.gambar[0])
          ? values.gambar[0]
          : await getUrlImage({
              file: values.gambar[0],
              gambar: values.defaultRef,
            });

        const _data = {
          ...values,
          gambar: fileUrl,
          popular_collection: data.popular_collection
            ? data.popular_collection
            : 0,
          created_at: data.created_at
            ? data.created_at
            : Timestamp.fromDate(date),
        };

        isEdit ? updateCollection(data.id, _data) : createCollection(_data);
        notifications.show({
          title: isEdit ? "Edit Collections" : "Tambah Collections",
          message: isEdit
            ? "Collection telah berhasil diupdate"
            : "Collection baru telah berhasil ditambahkan",
          color: "teal",
        });
        onClose();
      } catch (e) {
        notifications.show({
          title: isEdit ? "Edit Collection" : "Tambah Collection",
          message: isEdit
            ? "Collection telah gagal diupdate"
            : "Collection baru gagal ditambahkan",
          color: "red",
        });
      }
    },
    [data, isEdit, onClose]
  );

  return (
    <Paper p={36} miw={1000}>
      <Text fz={20} fw={600}>
        {isEdit ? "Edit Collection" : "Tambah Collection"}
      </Text>
      <Form onSubmit={onSubmit} methods={methods}>
        <Separator _gap={24} />
        <Flex direction="row">
          <TextInputField label="Nama" name="nama" style={{ flex: 1 }} />
          <Separator _gap={24} />
          <TextInputField label="Harga" name="harga" style={{ flex: 1 }} />
        </Flex>
        <Separator _gap={24} />
        <Flex direction="row">
          <ColorSelectInput label="Warna" name="id_warna" />
          <Separator _gap={24} />
          <CategorySelectInput label="Kategori" name="id_kategori" />
          <Separator _gap={24} />
          <TypeSelectInput label="Jenis" name="id_jenis" />
          <Separator _gap={24} />
          <SizeSelectInput label="Ukuran" name="id_ukuran" />
        </Flex>
        <Separator _gap={24} />
        <TextInputField
          label="Deskripsi"
          name="deskripsi"
          multiline={true}
          rows={6}
        />
        <Separator _gap={24} />
        <Text fz={16} fw={600}>
          Status
        </Text>
        <RadioInputField
          options={[
            { value: "Available", label: "Available" },
            { value: "Unavailable", label: "Unavailable" },
          ]}
          name="status"
          required
        />
        <Separator _gap={24} />
        <ImagesInputField name="gambar" />
        <Separator _gap={24} />
        <Flex justify="flex-end">
          <Button variant="text" color="error" onClick={onClose}>
            Batal
          </Button>
          <Button variant="text" type="submit">
            Simpan
          </Button>
        </Flex>
      </Form>
    </Paper>
  );
};

export default CollectionForm;
