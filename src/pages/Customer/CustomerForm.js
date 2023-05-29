import { Flex, Paper, Text } from "@mantine/core";
import { Button } from "@mui/material";
import * as React from "react";
import Separator from "../../components/separator";
import { notifications } from "@mantine/notifications";

import { createCustomer, updateCustomer } from "../../services/customer";
import { v4 } from "uuid";

import * as Yup from "yup";
import useYupValidationResolver from "../../hooks/use-yup-resolver";
import { useForm } from "react-hook-form";
import Form from "../../components/field/form";
import TextInputField from "../../components/field/text-input";

const CustomerForm = ({
  data = { email: "", name: "", phoneNumber: "", password: "123456", id: "" },
  onClose,
  isEdit = false,
}) => {
  const defaultValues = React.useMemo(
    () => ({
      email: data?.email || "",
      password: data?.name || "123456",
      phoneNumber: data?.phoneNumber || "",
      name: data?.name || "",
      id: v4(),
    }),
    [data]
  );

  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .email("Email Tidak Valid")
          .required("Email Wajib Diisi"),
        password: Yup.string().required("Password Wajib Diisi"),
        phoneNumber: Yup.string()
          .required("Nomor Telepon Wajib Diisi")
          .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            "Nomor Telepon Tidak Valid"
          ),
        name: Yup.string().required("Nama Wajib Diisi"),
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
          ? updateCustomer(data.id, {
              email: values.email,
              nama: values.name,
              nomor_telepon: values.phoneNumber,
              password: values.password,
            })
          : createCustomer({
              email: values.email,
              nama: values.name,
              nomor_telepon: values.phoneNumber,
              password: values.password,
            });
        notifications.show({
          title: isEdit ? "Edit User" : "Tambah User",
          message: isEdit
            ? "Customer telah berhasil diupdate"
            : "Customer telah berhasil ditambahkan",
          color: "teal",
        });
        onClose();
      } catch {
        notifications.show({
          title: "Tambah User",
          message: "Customer gagal ditambahkan",
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
            {isEdit ? "Edit Customer" : "Tambah Customer"}
          </Text>
          <Separator _gap={24} />
          <TextInputField label="Email" name="email" placeholder="Email" />
          <Separator _gap={24} />
          <TextInputField label="Nama" name="name" placeholder="Nama" />
          <Separator _gap={24} />
          <TextInputField
            label="Nomor Telepon"
            name="phoneNumber"
            placeholder="Nomor Telepon"
          />
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

export default CustomerForm;
