import { Flex, Paper, Text } from "@mantine/core";
import { Button } from "@mui/material";
import * as React from "react";
import Separator from "../../components/separator";
import { notifications } from "@mantine/notifications";

import { createSize, updateSize } from "../../services/size";
import { v4 } from "uuid";

import * as Yup from "yup";
import useYupValidationResolver from "../../hooks/use-yup-resolver";
import { useForm } from "react-hook-form";
import Form from "../../components/field/form";
import TextInputField from "../../components/field/text-input";

const FilterSizeForm = ({
  data = { nama_ukuran: "", id: "" },
  onClose,
  isEdit = false,
}) => {
  const defaultValues = React.useMemo(
    () => ({
      nama_ukuran: data?.nama_ukuran || "",
      id: v4(),
    }),
    [data]
  );

  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        nama_ukuran: Yup.string().required("Nama Ukuran Wajib Diisi"),
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
          ? updateSize(data.id, {
              nama_ukuran: values.nama_ukuran,
            })
          : createSize({
              nama_ukuran: values.nama_ukuran,
            });
        notifications.show({
          title: isEdit ? "Edit Ukuran" : "Tambah Ukuran",
          message: isEdit
            ? "Ukuran telah berhasil diupdate"
            : "Ukuran telah berhasil ditambahkan",
          color: "teal",
        });
        onClose();
      } catch {
        notifications.show({
          title: "Tambah Ukuran",
          message: "Ukuran baru gagal ditambahkan",
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
            {isEdit ? "Edit Ukuran" : "Tambah Ukuran"}
          </Text>
          <Separator _gap={24} />
          <TextInputField label="Nama Ukuran" name="nama_ukuran" />
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

export default FilterSizeForm;
