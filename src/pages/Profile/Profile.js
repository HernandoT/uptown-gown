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

// const defaultValues = {
//   email: "",
//   name: "",
//   password: "123456",
//   phoneNumber: "",
// };

const Profile = () => {
  const [opened, { open, close }] = useDisclosure(false);
  // const [currentData, setCurrentData] = React.useState(defaultValues);

  const onClickChangePass = React.useCallback(() => {
    // setCurrentData(defaultValues);
    open();
  }, [open]);

  return (
    <div className="profile">
      <Navbar />
      <div className="profile-content">
        <div className="profile-title">Edit Profile</div>
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
          <OutlinedInput
            disabled
            id="outlined-adornment-amount"
            startAdornment={
              <InputAdornment position="start">
                <i class="fa fa-envelope fa-lg"></i>
              </InputAdornment>
            }
            label="Email"
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">Nama</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={
              <InputAdornment position="start">
                <i class="fa fa-user fa-lg"></i>
              </InputAdornment>
            }
            label="Nama"
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">Nomor Telepon</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={
              <InputAdornment position="start">
                <i class="fa fa-phone fa-lg"></i>
              </InputAdornment>
            }
            label="Nomor Telepon"
          />
        </FormControl>
        <button className="profile-simpan">SIMPAN</button>
        <button className="profile-ubah-kata-sandi" onClick={onClickChangePass}>UBAH KATA SANDI</button>
      </div>
      <Footer />
      <Modal opened={opened} centered onClose={close} withCloseButton={false}>
        <ProfilePassword 
        // data={currentData} 
        onClose={close} />
      </Modal>
    </div>
  );
};

export default Profile;
