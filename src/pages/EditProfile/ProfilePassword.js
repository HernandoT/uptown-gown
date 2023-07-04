import * as React from "react";
import * as Yup from "yup";
import useYupValidationResolver from "../../hooks/use-yup-resolver";
import { Flex, Paper, Text } from "@mantine/core";
import { Button } from "@mui/material";
import Separator from "../../components/separator";
import Form from "../../components/field/form";
import { useForm } from "react-hook-form";
import { updateCustomer } from "../../services/customer";
import InputPasswordField from "../../components/field/input-password";
import { notifications } from "@mantine/notifications";

const ProfilePassword = ({onClose, data = { email: "", name: "", phoneNumber: "", password: "", id: "" },}) => {
  const defaultValues = React.useMemo(
    () => ({
      passwordNow: "",
      passwordNew: "",
      passwordRep: "",
    }),
    []
  );

  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        passwordNow: Yup.string()
          .required("Password Wajib Diisi")
          .matches(data?.password, "Password yang diinput salah"),
        passwordNew: Yup.string()
          .required("Password Baru Wajib Diisi")
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/, "Password minimal 8 karakter dengan setidaknya satu huruf kapital, satu huruf kecil, satu angka, dan satu karakter khusus"),
        passwordRep: Yup.string()
          .oneOf(
            [Yup.ref("passwordNew"), null],
            "Password yang dimasukkan tidak sama dengan Password Baru"
          )
          .required("Ulangi Password Baru Wajib Diisi"),
      }),
    [data]
  );

  const resolver = useYupValidationResolver(yupSchema);

  const methods = useForm({
    defaultValues,
    resolver,
    mode: "onChange",
  });

  const onSubmit = React.useCallback(async (values) => {
    try {
      updateCustomer(data.id, {
        password: values.passwordRep,
        email: data.email,
        nama: data.name,
        nomor_telepon: data.phoneNumber,
      });
      notifications.show({
        title: "Ganti Password",
        message: "Berhasil Ganti Password",
        color: "teal",
      });
      methods.reset();
      onClose();
    } catch (e) {
      notifications.show({
        title: "Ganti Password",
        message: "Gagal Ganti Password",
        color: "red",
      });
    } finally {
    }
  });

  return (
    <Paper p={36} miw={400}>
      <Form methods={methods} onSubmit={onSubmit}>
        <Flex direction="column">
          <Text fz={20} fw={600}>
            Ubah Kata Sandi
          </Text>
          <Separator _gap={24} />
          <InputPasswordField
            name="passwordNow"
            label="Kata Sandi saat ini"
          />
          <Separator _gap={24} />
          <InputPasswordField name="passwordNew" label="Kata Sandi baru" />
          <Separator _gap={24} />
          <InputPasswordField
            name="passwordRep"
            label="Ulangi Kata Sandi baru"
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

export default ProfilePassword;
