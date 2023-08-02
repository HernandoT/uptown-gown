import * as React from "react";
import * as Yup from "yup";
import useYupValidationResolver from "../../hooks/use-yup-resolver";
import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./ChangePassword.css";
import Form from "../../components/field/form";
import { useForm } from "react-hook-form";
import Separator from "../../components/separator";
import InputPasswordField from "../../components/field/input-password";
import { useQuery } from "@tanstack/react-query";
import { getAdmin, updateAdmin } from "../../services/admin";
import { notifications } from "@mantine/notifications";

const ChangePassword = () => {
  const id = localStorage.getItem("idAdmin");
  const { data, isFetching } = useQuery(
    ["get-admin", id],
    () => getAdmin(id || ""),
    { enabled: !!id }
  );

  const defaultValues = React.useMemo(
    () => ({
      email: data?.admin.email,
      password: data?.admin.password,
      nomor_telepon: data?.admin.nomor_telepon,
      nama: data?.admin.nama,
      main: data?.admin.main,
      id: id,
    }),
    [data, id]
  );

  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        passwordNow: Yup.string()
          .required("Password Wajib Diisi")
          .matches(data?.admin.password, "Password yang diinput salah"),
        passwordNew: Yup.string().required("Password Baru Wajib Diisi"),
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
      updateAdmin(id, {
        main: defaultValues.main,
        nama: defaultValues.nama,
        email: defaultValues.email,
        password: values.passwordRep,
        nomor_telepon: defaultValues.nomor_telepon,
      });
      notifications.show({
        title: "Ganti Password",
        message: "Berhasil Ganti Password",
        color: "teal",
      });
      methods.setValue("passwordNow", "");
      methods.setValue("passwordNew", "");
      methods.setValue("passwordRep", "");
    } catch (e) {
      notifications.show({
        title: "Ganti Password",
        message: "Gagal Ganti Password",
        color: "red",
      });
    } finally {
    }
  }, []);

  return (
    <div className="change-password">
      <AdminTitle props={"Change Password"} />
      {isFetching ? (
        <></>
      ) : (
        <>
          <div className="change-password-content card-container">
            <Form onSubmit={onSubmit} methods={methods}>
              <Separator _gap={12} />
              <InputPasswordField
                name="passwordNow"
                label="Kata Sandi saat ini"
              />
              <Separator _gap={12} />
              <InputPasswordField name="passwordNew" label="Kata Sandi baru" />
              <Separator _gap={12} />
              <InputPasswordField
                name="passwordRep"
                label="Ulangi Kata Sandi baru"
              />
              <Separator _gap={12} />
              <button className="change-password-simpan" type="submit">
                SIMPAN
              </button>
            </Form>
          </div>
        </>
      )}
    </div>
  );
};

export default ChangePassword;
