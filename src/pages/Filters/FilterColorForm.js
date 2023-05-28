import { Flex, Paper, Text } from "@mantine/core";
import { Button } from "@mui/material";
import * as React from "react";
import Separator from "../../components/separator";
import { notifications } from "@mantine/notifications";

import { createColor, updateColor } from "../../services/color";
import { v4 } from "uuid";

import * as Yup from "yup";
import useYupValidationResolver from "../../hooks/use-yup-resolver";
import { useForm } from "react-hook-form";
import Form from "../../components/field/form";
import TextInputField from "../../components/field/text-input";

const FilterColorForm = ({
  data = { nama_warna: "", kode_hex: "", id: "" },
  onClose,
  isEdit = false,
}) => {
  const defaultValues = React.useMemo(
    () => ({
      nama_warna: data?.nama_warna || "",
      kode_hex: data?.kode_hex || "",
      id: v4(),
    }),
    [data]
  );

  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        nama_warna: Yup.string().required("Nama Warna Wajib Diisi"),
        kode_hex: Yup.string().required("Kode Hex Wajib Diisi"),
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
      try {
        isEdit
          ? updateColor(data.id, {
              nama_warna: values.nama_warna,
              kode_hex: values.kode_hex,
            })
          : createColor({
              nama_warna: values.nama_warna,
              kode_hex: values.kode_hex,
            });
        notifications.show({
          title: isEdit ? "Edit Warna" : "Tambah Warna",
          message: isEdit
            ? "Warna telah berhasil diupdate"
            : "Warna telah berhasil diedit",
          color: "teal",
        });
        onClose();
      } catch {
        notifications.show({
          title: "Tambah Warna",
          message: "Warna baru gagal ditambahkan",
          color: "red",
        });
      } finally {
      }
    },
    [data.id, isEdit, onClose]
  );

  return (
    <Paper p={36} miw={400}>
      <Form onSubmit={onSubmit} methods={methods}>
        <Flex direction="column">
          <Text fz={20} fw={600}>
            {isEdit ? "Edit Warna" : "Tambah Warna"}
          </Text>
          <Separator _gap={24} />
          <TextInputField label="Nama Warna" name="nama_warna" placeholder="Nama Warna" />
          <Separator _gap={24} />
          <TextInputField label="Kode Hex" name="kode_hex" placeholder="Kode Hex" />
          <Separator _gap={24} />
          <Flex justify="flex-end">
            <Button variant="text" color="error" onClick={onClose}>
              Batal
            </Button>
            <Button variant="text" type="submit">
              Simpan
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Paper>
  );
};

export default FilterColorForm;
