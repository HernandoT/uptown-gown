import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./ChangePassword.css";
import { useState } from "react";
import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ChangePassword = () => {
  const [showPasswordNow, setShowPasswordNow] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPasswordNow = () => setShowPasswordNow((show) => !show);
  const handleClickShowPasswordNew = () => setShowPasswordNew((show) => !show);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="change-password">
      <AdminTitle props={"Change Password"} />
      <div className="change-password-content">
        <FormControl variant="outlined" fullWidth className="change-password-form">
          <InputLabel htmlFor="outlined-adornment-password">
            Kata Sandi saat ini
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPasswordNow ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordNow}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPasswordNow ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Kata Sandi saat ini"
            name="password"
          />
        </FormControl>
        <FormControl variant="outlined" fullWidth className="change-password-form">
          <InputLabel htmlFor="outlined-adornment-password">
            Kata Sandi baru
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPasswordNew ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordNew}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPasswordNew ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Kata Sandi baru"
            name="password"
          />
        </FormControl>
        <FormControl variant="outlined" fullWidth className="change-password-form">
          <InputLabel htmlFor="outlined-adornment-password">
            Ulangi Kata Sandi baru
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Ulangi Kata Sandi baru"
            name="password"
          />
        </FormControl>
        <button className="change-password-simpan">SIMPAN</button>
      </div>
    </div>
  );
};

export default ChangePassword;
