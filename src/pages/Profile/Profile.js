import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";
import Footer from "../../components/Footer/Footer";

const Profile = () => {
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
        <button className="profile-ubah-kata-sandi">UBAH KATA SANDI</button>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
