import * as React from "react";
import * as Yup from "yup";
import useYupValidationResolver from "../../hooks/use-yup-resolver";
import { useForm } from "react-hook-form";
import { Paper, Text } from "@mantine/core";
import Form from "../../components/field/form";
import TextInputField from "../../components/field/text-input";
import ColorSelectInput from "../../components/Select/color-select-input";
import CategorySelectInput from "../../components/Select/category-select-input";
import TypeSelectInput from "../../components/Select/type-select-input";
import RadioInputField from "../../components/field/radio-input";
import ImagesInputField from "../../components/field/image";
import { getUrlImage } from "../../utils/image-function";

const CollectionForm = () => {
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
        nama: Yup.string().required(),
        id_warna: Yup.string().required(),
        id_kategori: Yup.string().required(),
        id_jenis: Yup.string().required(),
        deskripsi: Yup.string(),
        status: Yup.string().required(),
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
    <Paper miw={600}>
      <Text fz={20} fw={600}>
        {false ? "Edit Customer" : "Tambah Customer"}
      </Text>
      <Form onSubmit={onSubmit} methods={methods}>
        <TextInputField label="Nama" placeholder="Nama" name="nama" required />
        <ColorSelectInput
          label="Warna"
          placeholder="Warna"
          name="id_warna"
          required
        />
        <CategorySelectInput
          label="Kategori"
          placeholder="Kategori"
          name="id_kategori"
          required
        />
        <TypeSelectInput
          label="Jenis"
          placeholder="Jenis"
          name="id_jenis"
          required
        />
        <TextInputField
          label="Deskripsi"
          placeholder="Deskripsi"
          name="deskripsi"
        />
        <RadioInputField
          label="Status"
          options={[
            { value: "available", label: "Available" },
            { value: "unavailable", label: "Unavailable" },
          ]}
          name="status"
          required
        />
        <ImagesInputField defaultRef={defaultValues.defaultRef} name="file" />
        <button type="submit">submit</button>
      </Form>
    </Paper>
  );
};

export default CollectionForm;
