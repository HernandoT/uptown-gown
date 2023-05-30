import { Flex, Paper, Text } from "@mantine/core";
import { Button } from "@mui/material";
import * as React from "react";
import Separator from "../../components/separator";
import { notifications } from "@mantine/notifications";

import { createCategory, updateCategory } from "../../services/category";
import { v4 } from "uuid";

import * as Yup from "yup";
import useYupValidationResolver from "../../hooks/use-yup-resolver";
import { useForm } from "react-hook-form";
import Form from "../../components/field/form";
import TextInputField from "../../components/field/text-input";

const FilterCategoryForm = ({
  data = { nama_kategori: "", id: "" },
  onClose,
  isEdit = false,
}) => {
  const defaultValues = React.useMemo(
    () => ({
      nama_kategori: data?.nama_kategori || "",
      id: v4(),
    }),
    [data]
  );

  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        nama_kategori: Yup.string().required("Nama Kategori Wajib Diisi"),
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
          ? updateCategory(data.id, {
              nama_kategori: values.nama_kategori,
            })
          : createCategory({
              nama_kategori: values.nama_kategori,
            });
        notifications.show({
          title: isEdit ? "Edit Kategori" : "Tambah Kategori",
          message: isEdit
            ? "Kategori telah berhasil diupdate"
            : "Kategori telah berhasil diedit",
          color: "teal",
        });
        onClose();
      } catch {
        notifications.show({
          title: "Tambah Kategori",
          message: "Kategori baru gagal ditambahkan",
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
            {isEdit ? "Edit Kategori" : "Tambah Kategori"}
          </Text>
          <Separator _gap={24} />
          <TextInputField label="Nama Kategori" name="nama_kategori" />
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

export default FilterCategoryForm;
