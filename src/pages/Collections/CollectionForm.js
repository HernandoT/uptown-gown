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

const CollectionForm = ({
  onClose,
  data = {
    nama: "",
    id_warna: "",
    id_kategori: "",
    id_jenis: "",
    deskripsi: "",
    status: "",
    file: "",
  },
}) => {
  const defaultValues = React.useMemo(() => {
    return {
      nama: data.nama || "",
      id_warna: data.id_warna || "",
      id_kategori: data.id_kategori || "",
      id_jenis: data.id_jenis || "",
      deskripsi: data.deskripsi || "",
      status: data.status || "",
      file: data.file ? [data.file] : [],
      defaultRef: data.file ? data.file : `${v4()}.jpeg`,
    };
  }, [data]);

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
    mode: "onChange",
  });

  const onSubmit = React.useCallback(async (values) => {
    try {
      //if still url don't submit to firebase
      const fileUrl = urlPattern(values.file[0])
        ? values.file[0]
        : await getUrlImage({
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
        <TextInputField label="Nama" name="nama" />
        <Separator _gap={24} />
        <Flex direction="row">
          <ColorSelectInput label="Warna" name="id_warna" />
          <Separator _gap={24} />
          <CategorySelectInput label="Kategori" name="id_kategori" />
          <Separator _gap={24} />
          <TypeSelectInput label="Jenis" name="id_jenis" />
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
            { value: "available", label: "Available" },
            { value: "unavailable", label: "Unavailable" },
          ]}
          name="status"
          required
        />
        <Separator _gap={24} />
        <ImagesInputField name="file" />
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
