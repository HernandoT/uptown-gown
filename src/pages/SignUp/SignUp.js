import * as React from "react";
import { useState, useEffect } from "react";
import {
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "../../utils/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import emailjs from "@emailjs/browser";
import { createCustomer, getCustomers } from "../../services/customer";
import { getAdmins } from "../../services/admin";
import { useQuery } from "@tanstack/react-query";

const SignUp = () => {
  const navigate = useNavigate();

  const [account, setAccount] = useState([]);
  const [errorMessagesEmail, setErrorMessagesEmail] = useState("");
  const [errorMessagesNama, setErrorMessagesNama] = useState("");
  const [errorMessagesNomor, setErrorMessagesNomor] = useState("");
  const [errorMessagesPassword, setErrorMessagesPassword] = useState("");
  const [errorMessagesRepPassword, setErrorMessagesRepPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepPassword, setShowRepPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowRepPassword = () => setShowRepPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownRepPassword = (event) => {
    event.preventDefault();
  };

  const { data: dataCustomer, isFetching: isFetchingCustomer } = useQuery(
    ["get-customers"],
    () => getCustomers()
  );

  const { data: dataAdmin, isFetching: isFetchingAdmin } = useQuery(
    ["get-admins"],
    () => getAdmins()
  );

  useEffect(() => {
    if (!isFetchingAdmin && !isFetchingCustomer) {
      const acc = [];
      const cust = dataCustomer.data.map((customer) => ({
        ...customer,
        isCustomer: true,
      }));
      const adm = dataAdmin.data.map((admin) => ({ ...admin, isAdmin: true }));
      acc.push(cust);
      acc[0].push(adm[0]);
      setAccount(acc);
    }
  }, [dataAdmin, dataCustomer, isFetchingAdmin, isFetchingCustomer]);

  const errors = {
    email: "Email Telah Terdaftar",
    emailInvalid: "Email Tidak Valid",
    nomorInvalid: "Nomor Tidak Valid",
    namaInvalid: "Nama Tidak Valid",
    passwordInvalid: "Password minimal 8 karakter dengan setidaknya satu huruf kapital, satu huruf kecil, satu angka, dan satu karakter khusus",
    repPasswordInvalid: "Password yang diinput tidak sama",
    null: "Harap diisi",
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidNumber(number) {
    return /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/.test(
      number
    );
  }

  function isValidName(name) {
    return /^(?!^\s)[A-Za-z\s]{2,}$/.test(
      name
    );
  }

  function isValidPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/.test(
      password
    );
  }

  const handleChangeEmail = (event) => {
    if (!isValidEmail(event.target.value)) {
      setErrorMessagesEmail(errors.emailInvalid);
    } else {
      setErrorMessagesEmail("");
    }
  };

  const handleChangeNumber = (event) => {
    if (!isValidNumber(event.target.value)) {
      setErrorMessagesNomor(errors.nomorInvalid);
    } else {
      setErrorMessagesNomor("");
    }
  };

  const handleChangeName = (event) => {
    if (!isValidName(event.target.value)) {
      setErrorMessagesNama(errors.namaInvalid);
    } else {
      setErrorMessagesNama("");
    }
  };

  const handleChangePassword = (event) => {
    if (!isValidPassword(event.target.value)) {
      setErrorMessagesPassword(errors.passwordInvalid);
    } else {
      setErrorMessagesPassword("");
    }
  };

  const handleChangeRepPassword = (event) => {
    if (!isValidPassword(event.target.value)) {
      setErrorMessagesRepPassword(errors.repPasswordInvalid);
    } else {
      setErrorMessagesRepPassword("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    var { email, nama, nomor, password, ulangiPassword } = document.forms[0];

    console.log(ulangiPassword.value);

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    function generateString(length) {
      let result = "";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    // Find user signup info
    const userData = account[0].find((acc) => acc.email === email.value);

    // Compare user info
    if (userData) {
      setErrorMessagesEmail(errors.email);
    }
    else if (email.value === "") {
      setErrorMessagesEmail(errors.null);
    }
    else if (nama.value === "") {
      setErrorMessagesNama(errors.null);
    }
    else if (nomor.value === "") {
      setErrorMessagesNomor(errors.null);
    }
    else if (password.value === "") {
      setErrorMessagesPassword(errors.null);
    } 
    else if (password.value !== ulangiPassword.value) {
      setErrorMessagesRepPassword(errors.repPasswordInvalid);
    }
    else {
      const token = generateString(20);
      var templateParams = {
        email: email.value,
        nama: nama.value,
        token: token,
      };

      createCustomer({
        email: email.value,
        nama: nama.value,
        nomor_telepon: nomor.value,
        password: password.value,
        disabled: 0,
        token: token,
      });

      emailjs
        .send(
          "service_53s5rrf",
          "template_15wxof6",
          templateParams,
          "C4ktx7lrffBSEAByY"
        )
        .then(
          (result) => {
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
      navigate("/confirmation-token", {
        state: { email: email.value, fromLogin: false },
      });
    }
  };

  const renderErrorMessageEmail = () =>
    errorMessagesEmail && <div className="signup-error">{errorMessagesEmail}</div>;

  const renderErrorMessageNama = () =>
    errorMessagesNama && <div className="signup-error">{errorMessagesNama}</div>;

  const renderErrorMessageNomor = () =>
    errorMessagesNomor && <div className="signup-error">{errorMessagesNomor}</div>;

  const renderErrorMessagePassword = () =>
    errorMessagesPassword && (
      <div className="signup-error">{errorMessagesPassword}</div>
    );

  const renderErrorMessageRepPassword = () =>
    errorMessagesRepPassword && (
      <div className="signup-error">{errorMessagesRepPassword}</div>
    );

  return (
    <div className="signup">
      <div className="signup-form">
        <div className="signup-logo">
          <img src={logo} alt="logo" className="signup-logo-image"></img>
        </div>
        <div className="signup-input">
          <div className="signup-title">Sign Up</div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="signup-input-container">
                <TextField
                  onChange={handleChangeEmail}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  error={errorMessagesEmail}
                />
                {renderErrorMessageEmail()}
              </div>
              <div className="input-container">
                <TextField
                  onChange={handleChangeName}
                  id="outlined-basic"
                  label="Nama Lengkap"
                  variant="outlined"
                  name="nama"
                  error={errorMessagesNama}
                />
                {renderErrorMessageNama()}
              </div>
              <div className="input-container">
                <TextField
                  onChange={handleChangeNumber}
                  id="outlined-basic"
                  label="Nomor Telepon"
                  variant="outlined"
                  name="nomor"
                  error={errorMessagesNomor}
                />
                {renderErrorMessageNomor()}
              </div>
              <div className="input-container">
                <FormControl variant="outlined">
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    error={errorMessagesPassword}
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    onChange={handleChangePassword}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    error={errorMessagesPassword}
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
                    label="Password"
                    name="password"
                  />
                </FormControl>
                {renderErrorMessagePassword()}
              </div>
              <div className="input-container">
                <FormControl variant="outlined">
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    error={errorMessagesRepPassword}
                  >
                    Ulangi Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-rep-password"
                    type={showRepPassword ? "text" : "password"}
                    error={errorMessagesRepPassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowRepPassword}
                          onMouseDown={handleMouseDownRepPassword}
                          edge="end"
                        >
                          {showRepPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Ulangi Password"
                    name="ulangiPassword"
                  />
                </FormControl>
                {renderErrorMessageRepPassword()}
              </div>
              <div className="signup-button-container">
                <input
                  type="submit"
                  value="BUAT AKUN"
                  className="signup-button-submit"
                />
              </div>
            </form>
          </div>
          <div style={{ marginTop: "2rem", fontSize: "0.9rem" }}>
            Sudah punya akun?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <strong>Log In</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
