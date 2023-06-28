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
import { createCustomer } from "../../services/customer";

const SignUp = () => {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState([]);
  const [errorMessagesEmail, setErrorMessagesEmail] = useState("");
  const [errorMessagesNama, setErrorMessagesNama] = useState("");
  const [errorMessagesNomor, setErrorMessagesNomor] = useState("");
  const [errorMessagesPassword, setErrorMessagesPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const fetchCustomer = async () => {
    await getDocs(collection(db, "customer")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCustomer(newData);
    });
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const errors = {
    email: "Email telah terdaftar",
    emailInvalid: "Email invalid",
    nomorInvalid: "Nomor invalid",
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

  const handleSubmit = (event) => {
    event.preventDefault();

    var { email, nama, nomor, password } = document.forms[0];

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
    const userData = customer.find((cust) => cust.email === email.value);

    // Compare user info
    if (userData) {
      setErrorMessagesEmail(errors.email);
    }
    if (email.value === "") {
      setErrorMessagesEmail(errors.null);
    }
    if (nama.value === "") {
      setErrorMessagesNama(errors.null);
    }
    if (nomor.value === "") {
      setErrorMessagesNomor(errors.null);
    }
    if (password.value === "") {
      setErrorMessagesPassword(errors.null);
    } else {
      const token = generateString(20);
      var templateParams = {
        email: email.value,
        nama: nama.value,
        token: token,
      };

      createCustomer({
        email: email.value,
        nama: nama.value,
        nomor: nomor.value,
        password: password.value,
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
        state: { email: userData.email, fromLogin: false },
      });
    }
  };

  const renderErrorMessageEmail = () =>
    errorMessagesEmail && <div className="error">{errorMessagesEmail}</div>;

  const renderErrorMessageNama = () =>
    errorMessagesNama && <div className="error">{errorMessagesNama}</div>;

  const renderErrorMessageNomor = () =>
    errorMessagesNomor && <div className="error">{errorMessagesNomor}</div>;

  const renderErrorMessagePassword = () =>
    errorMessagesPassword && (
      <div className="error">{errorMessagesPassword}</div>
    );

  return (
    <div className="signup">
      <div className="signup-form">
        <div className="logo">
          <img src={logo} alt="logo" className="logoImage"></img>
        </div>
        <div className="input">
          <div className="title">Sign Up</div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="input-container">
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
                  onChange={() => setErrorMessagesNama("")}
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
                    onChange={() => setErrorMessagesPassword("")}
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
              <div className="button-container">
                <input
                  type="submit"
                  value="BUAT AKUN"
                  className="button-submit"
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
