import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";
import Footer from "../../components/Footer/Footer";
import * as React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import ProfilePassword from "./ProfilePassword";
import { useQuery } from "@tanstack/react-query";
import { getCustomer, updateCustomer } from "../../services/customer";
import { notifications } from "@mantine/notifications";

const defaultValues = {
  email: "",
  name: "",
  password: "123456",
  phoneNumber: "",
};

const Profile = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [currentData, setCurrentData] = React.useState(defaultValues);

  const idCustomer = localStorage.getItem("idCustomer");

  const { data, isFetching } = useQuery(
    ["get-customer", idCustomer],
    () => getCustomer(idCustomer || ""),
    { enabled: !!idCustomer }
  );

  const onClickChangePass = React.useCallback(() => {
    setCurrentData({
      email: data.user.email,
      name: data.user.nama,
      phoneNumber: data.user.nomor_telepon,
      id:idCustomer, 
      password: data.user.password
    });
    open();
  }, [open,setCurrentData, data?.user,idCustomer]);

  const handleSubmit = (event) => {
    event.preventDefault();

    var { nama, nomor_telepon } = document.forms[0];

    try {
      updateCustomer(idCustomer, {
        email: data.user.email,
        nama: nama.value,
        nomor_telepon: nomor_telepon.value,
        password: data.user.password,
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
  };

  return (
    <div className="profile">
      <Navbar />
      <div className="profile-content">
        <div className="profile-title">Edit Profile</div>
        {isFetching ? (
          <></>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth style={{ marginBottom: 24 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Email
                </InputLabel>
                <OutlinedInput
                  defaultValue={data.user.email}
                  disabled
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">
                      <i className="fa fa-envelope fa-lg"></i>
                    </InputAdornment>
                  }
                  label="Email"
                  name="email"
                />
              </FormControl>
              <FormControl fullWidth style={{ marginBottom: 24 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Nama
                </InputLabel>
                <OutlinedInput
                  defaultValue={data.user.nama}
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">
                      <i className="fa fa-user fa-lg"></i>
                    </InputAdornment>
                  }
                  label="Nama"
                  name="nama"
                />
              </FormControl>
              <FormControl fullWidth style={{ marginBottom: 24 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Nomor Telepon
                </InputLabel>
                <OutlinedInput
                  defaultValue={data.user.nomor_telepon}
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">
                      <i className="fa fa-phone fa-lg"></i>
                    </InputAdornment>
                  }
                  label="Nomor Telepon"
                  name="nomor_telepon"
                />
              </FormControl>
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
            </form>
          </>
        )}
      </div>
      <Footer />
      <Modal opened={opened} centered onClose={close} withCloseButton={false}>
        <ProfilePassword onClose={close} data={currentData}/>
      </Modal>
    </div>
  );
};

export default Profile;
