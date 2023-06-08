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

const CollectionForm = ({ onClose }) => {
  const defaultValues = React.useMemo(() => {
    return {
      nama: "",
      id_warna: "",
      id_kategori: "",
      id_jenis: "",
      deskripsi: "",
      status: "",
      file: [],
      defaultRef:
        //masukkan detail dari file url
        "https://firebasestorage.googleapis.com/v0/b/uptown-gown-a7b88.appspot.com/o/39207935-9d3b-481b-b40f-23868a30a455.jpeg?alt=media&token=2aa2c3bc-b23c-4b5f-84da-ce1753aea924",
    };
  }, []);

  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        nama: Yup.string().required("Nama Collection Wajib Diisi"),
        id_warna: Yup.string().required("Harap pilih Warna terlebih dahulu"),
        id_kategori: Yup.string().required(
          "Harap pilih Kategori terlebih dahulu"
        ),
        id_jenis: Yup.string().required("Harap pilih Jenis terlebih dahulu"),
        deskripsi: Yup.string().required("Deskripsi Wajib Diisi"),
        status: Yup.string().required(
          "Harap pilih Status Ketersediaan terlebih dahulu"
        ),
        file: Yup.array().min(1).required(),
      }),
    []
  );

  const resolver = useYupValidationResolver(yupSchema);

  const methods = useForm({
    defaultValues,
    resolver,
    mode: "all",
  });

  const onSubmit = React.useCallback(async (values) => {
    try {
      const fileUrl = await getUrlImage({
        file: values.file[0],
        ref: values.defaultRef,
      });

      const data = {
        ...values,
        file: fileUrl,
      };
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Paper p={36} miw={1000}>
      <Text fz={20} fw={600}>
        {false ? "Edit Collection" : "Tambah Collection"}
      </Text>
      <Form onSubmit={onSubmit} methods={methods}>
        <Separator _gap={24} />
        <TextInputField label="Nama" name="nama" required />
        <Separator _gap={24} />
        <Flex direction="row">
          <ColorSelectInput label="Warna" name="id_warna" required />
          <Separator _gap={24} />
          <CategorySelectInput label="Kategori" name="id_kategori" required />
          <Separator _gap={24} />
          <TypeSelectInput label="Jenis" name="id_jenis" required />
        </Flex>
        <Separator _gap={24} />
        <TextInputField
          label="Deskripsi"
          name="deskripsi"
          multiline={true}
          rows={6}
          required
        />
        <Separator _gap={24} />
        <Text fz={16} fw={600}>
          Status
        </Text>
        <RadioInputField
          options={[
            { value: "available", label: "Available" },
            { value: "unavailable", label: "Unavailable" },
          ]}
          name="status"
          required
        />
        <Separator _gap={24} />
        <Text fz={16} fw={600}>
          Unggah Gambar
        </Text>
        <ImagesInputField defaultRef={defaultValues.defaultRef} name="file" />
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
