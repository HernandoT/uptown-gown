import { Flex, Paper, Text } from "@mantine/core";
import { Button } from "@mui/material";
import * as React from "react";
import Separator from "../../components/separator";
import { notifications } from "@mantine/notifications";

import { createType, updateType } from "../../services/type";
import { v4 } from "uuid";

import * as Yup from "yup";
import useYupValidationResolver from "../../hooks/use-yup-resolver";
import { useForm } from "react-hook-form";
import Form from "../../components/field/form";
import TextInputField from "../../components/field/text-input";

const FilterTypeForm = ({
  data = { nama_jenis: "", id: "" },
  onClose,
  isEdit = false,
}) => {
  const defaultValues = React.useMemo(
    () => ({
      nama_jenis: data?.nama_jenis || "",
      id: v4(),
    }),
    [data]
  );

  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        nama_jenis: Yup.string().required("Nama Jenis Wajib Diisi"),
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
          ? updateType(data.id, {
              nama_jenis: values.nama_jenis,
            })
          : createType({
              nama_jenis: values.nama_jenis,
            });
        notifications.show({
          title: isEdit ? "Edit Jenis" : "Tambah Jenis",
          message: isEdit
            ? "Jenis telah berhasil diupdate"
            : "Jenis telah berhasil diedit",
          color: "teal",
        });
        onClose();
      } catch {
        notifications.show({
          title: "Tambah Jenis",
          message: "Jenis baru gagal ditambahkan",
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
            {isEdit ? "Edit Jenis" : "Tambah Jenis"}
          </Text>
          <Separator _gap={24} />
          <TextInputField label="Nama Jenis" name="nama_jenis" placeholder="Nama Jenis" />
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

export default FilterTypeForm;
