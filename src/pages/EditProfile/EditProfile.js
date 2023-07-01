import "./EditProfile.css";
import * as React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import ProfilePassword from "./ProfilePassword";
import { useQuery } from "@tanstack/react-query";
import { getCustomer, updateCustomer } from "../../services/customer";
import { notifications } from "@mantine/notifications";
import * as Yup from "yup";
import useYupValidationResolver from "../../hooks/use-yup-resolver";
import { useForm } from "react-hook-form";
import IconTextInputField from "../../components/field/icon-text-input";
import Form from "../../components/field/form";

const EditProfile = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const idCustomer = localStorage.getItem("idCustomer");

  const { data, isSuccess, isFetching } = useQuery(
    ["get-customer", idCustomer],
    () => getCustomer(idCustomer || ""),
    { enabled: !!idCustomer }
  );

  const defaultValues = React.useMemo(
    () => ({
      email: data?.user.email || "",
      password: data?.user.password || "123456",
      phoneNumber: data?.user.nomor_telepon || "",
      name: data?.user.nama || "",
      id: idCustomer,
    }),
    [data, idCustomer]
  );

  const [currentData, setCurrentData] = React.useState(defaultValues);

  const onClickChangePass = React.useCallback(() => {
    setCurrentData({
      email: data.user.email,
      name: data.user.nama,
      phoneNumber: data.user.nomor_telepon,
      id: idCustomer,
      password: data.user.password,
    });
    open();
  }, [open, setCurrentData, data?.user, idCustomer]);

  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        phoneNumber: Yup.string()
          .required("Nomor Telepon Wajib Diisi")
          .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            "Nomor Telepon Tidak Valid"
          ),
        name: Yup.string()
          .required("Nama Wajib Diisi")
          .matches(/^(?!^\s)[A-Za-z\s]{2,}$/, "Nama Tidak Valid"),
      }),
    []
  );

  const resolver = useYupValidationResolver(yupSchema);

  const methods = useForm({
    defaultValues,
    resolver,
    mode: "onChange",
  });

  const handleSubmit = React.useCallback(
    async (values) => {
      try {
        updateCustomer(idCustomer, {
          email: values.email,
          nama: values.name,
          nomor_telepon: values.phoneNumber,
          password: values.password,
        });
        notifications.show({
          title: "Edit Profile",
          message: "Profile telah berhasil diupdate",
          color: "teal",
        });
      } catch {
        notifications.show({
          title: "Edit Profile",
          message: "Profile gagal diupdate",
          color: "red",
        });
      } finally {
      }
    },
    [idCustomer]
  );

  React.useEffect(() => {
    if (isSuccess) {
      methods.reset(defaultValues);
    }
  }, [defaultValues, isSuccess, methods]);

  return (
    <>
      <div className="profile-content card-container">
        <div className="profile-title">Edit Profile</div>
        <>
          <Form
            onSubmit={handleSubmit}
            methods={methods}
            style={{ display: "block" }}
          >
            <IconTextInputField
              disabled
              label="Email"
              name="email"
              icon={<i className="fa fa-envelope fa-lg"></i>}
            />
            <IconTextInputField
              label="Nama"
              name="name"
              icon={<i className="fa fa-user fa-lg"></i>}
            />
            <IconTextInputField
              label="Nomor Telepon"
              name="phoneNumber"
              icon={<i className="fa fa-phone fa-lg"></i>}
            />
            <button className="profile-simpan" type="submit">
              SIMPAN
            </button>
            <button
              type="button"
              className="profile-ubah-kata-sandi"
              onClick={onClickChangePass}
            >
              UBAH KATA SANDI
            </button>
          </Form>
        </>
      </div>
      <Modal opened={opened} centered onClose={close} withCloseButton={false}>
        <ProfilePassword onClose={close} data={currentData} />
      </Modal>
    </>
  );
};

export default EditProfile;
