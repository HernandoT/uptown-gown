import { Flex, Paper, Text } from "@mantine/core";
import { Button } from "@mui/material";
import * as React from "react";
import Separator from "../../components/separator";
import { notifications } from "@mantine/notifications";

import { createAdmin, updateAdmin } from "../../services/admin";
import { v4 } from "uuid";

import * as Yup from "yup";
import useYupValidationResolver from "../../hooks/use-yup-resolver";
import { useForm } from "react-hook-form";
import Form from "../../components/field/form";
import TextInputField from "../../components/field/text-input";

const AdminForm = ({
  data = { email: "", nama: "", nomor_telepon: "", password: "123456", main: "", id: "" },
  onClose,
  isEdit = false,
  dataAdmin = []
}) => {
  const defaultValues = React.useMemo(
    () => ({
      email: data?.email || "",
      password: data?.password || "123456",
      nomor_telepon: data?.nomor_telepon || "",
      nama: data?.nama || "",
      id: v4(),
    }),
    [data]
  );

  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .email("Email Tidak Valid")
          .required("Email Wajib Diisi")
          .test('unique', 'Email Telah Terdaftar', async function (value) {
            const isEmailRegistered = await checkEmailExistence(value);
            return !isEmailRegistered;
          }),
        nomor_telepon: Yup.string()
          .required("Nomor Telepon Wajib Diisi")
          .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            "Nomor Telepon Tidak Valid"
          ),
        nama: Yup.string()
          .required("Nama Wajib Diisi")
          .matches(/^(?!^\s)[A-Za-z\s]{2,}$/, "Nama Tidak Valid"),
      }),
    []
  );

  async function checkEmailExistence(email) {
    const userData = dataAdmin.find((cust) => cust.email === email);
    return !!userData;
  }

  const resolver = useYupValidationResolver(yupSchema);

  const methods = useForm({
    defaultValues,
    resolver,
    mode: "onChange",
  });

  const onSubmit = React.useCallback(
    async (values) => {
      console.log(values)
      try {
        isEdit
          ? updateAdmin(data.id, {
              email: values.email,
              nama: values.nama,
              nomor_telepon: values.nomor_telepon,
              password: defaultValues.password,
              main: defaultValues.main
            })
          : createAdmin({
              email: values.email,
              nama: values.nama,
              nomor_telepon: values.nomor_telepon,
              password: "123456",
              main: "0"
            });
        notifications.show({
          title: isEdit ? "Edit Admin" : "Tambah Admin",
          message: isEdit
            ? "Admin telah berhasil diupdate"
            : "Admin telah berhasil ditambahkan",
          color: "teal",
        });
        onClose();
      } catch {
        notifications.show({
          title: "Tambah Admin",
          message: "Admin gagal ditambahkan",
          color: "red",
        });
      } finally {
      }
    },
    [data?.id, defaultValues.password, isEdit, onClose]
  );

  return (
    <Paper p={36} miw={400}>
      <Form onSubmit={onSubmit} methods={methods}>
        <Flex direction="column">
          <Text fz={20} fw={600}>
            {isEdit ? "Edit Admin" : "Tambah Admin"}
          </Text>
          <Separator _gap={24} />
          <TextInputField label="Email" name="email" />
          <Separator _gap={24} />
          <TextInputField label="Nama" name="nama" />
          <Separator _gap={24} />
          <TextInputField label="Nomor Telepon" name="nomor_telepon" />
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

export default AdminForm;
