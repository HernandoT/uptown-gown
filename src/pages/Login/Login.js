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
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Login.css";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../../services/customer";
import { getAdmins } from "../../services/admin";

const Login = () => {
  const navigate = useNavigate();

  const [account, setAccount] = useState([]);
  const [errorMessagesEmail, setErrorMessagesEmail] = useState("");
  const [errorMessagesPassword, setErrorMessagesPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
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
      const adm = dataAdmin.data.map((admin) => ({ 
        ...admin, 
        isAdmin: true 
      }));
      acc.push(cust);
      acc[0].push(...adm);
      setAccount(acc);
    }
  }, [dataAdmin, dataCustomer, isFetchingAdmin, isFetchingCustomer]);

  const errors = {
    email: "Email yang anda masukkan tidak ditemukan",
    emailInvalid: "Invalid Email",
    disabled: "Email ini telah di-nonaktifkan",
    password: "Password yang dimasukkan salah",
    null: "Harap diisi",
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChangeEmail = (event) => {
    if (!isValidEmail(event.target.value)) {
      setErrorMessagesEmail(errors.emailInvalid);
    } else {
      setErrorMessagesEmail("");
    }
  };

  const handleChangePassword = (event) => {
    if (event.target.value !== "") {
      setErrorMessagesEmail("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessagesEmail("");
    setErrorMessagesPassword("");

    var { email, password } = document.forms[0];

    // Find user login info
    const userData = account[0].find((acc) => acc.email === email.value);

    if (email.value === "" || password.value === "") {
      if (email.value === "") setErrorMessagesEmail(errors.null);
      if (password.value === "") setErrorMessagesPassword(errors.null);
    } else if (userData) {
      // Invalid password
      if (userData.password !== password.value)
        return setErrorMessagesPassword(errors.password);

      // Disabled User
      if (userData.disabled === "1")
        return setErrorMessagesEmail(errors.disabled);

      if (email.value !== "" || password.value !== "")
        if (userData.token) {
          // Have token
          navigate("/confirmation-token", {
            state: { email: userData.email, fromLogin: true },
          });
        } else if (userData.isCustomer) {
          localStorage.setItem("isLoged", true);
          localStorage.setItem("email", email.value);
          localStorage.setItem("idCustomer", userData.id);
          navigate("/");
        } else if (userData.isAdmin) {
          localStorage.setItem("isAdmin", true);
          localStorage.setItem("idAdmin", userData.id);
          navigate("/admin");
        }
    } else {
      // Email not found
      setErrorMessagesEmail(errors.email);
      setErrorMessagesPassword("");
    }
  };

  const renderErrorMessageEmail = () =>
    errorMessagesEmail && <div className="error">{errorMessagesEmail}</div>;

  const renderErrorMessagePassword = () =>
    errorMessagesPassword && (
      <div className="error">{errorMessagesPassword}</div>
    );

  return (
    <div className="login">
      {isFetchingAdmin && isFetchingCustomer ? (
        <></>
      ) : (
        <div className="login-form">
          <div className="logo">
            <img src={logo} alt="logo" className="logoImage"></img>
          </div>
          <div className="input">
            <div className="title">Login</div>
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
                  <FormControl variant="outlined">
                    <InputLabel
                      htmlFor="outlined-adornment-password"
                      error={errorMessagesPassword}
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
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
                      onChange={handleChangePassword}
                    />
                  </FormControl>
                  {renderErrorMessagePassword()}
                  <div style={{ fontSize: "0.8rem" }}>
                    Lupa Password?{" "}
                    <Link
                      to="/reset-password"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <strong>Klik untuk reset password</strong>
                    </Link>
                  </div>
                </div>
                <div className="button-container">
                  <input
                    type="submit"
                    value="LOGIN"
                    className="button-submit"
                  />
                </div>
              </form>
            </div>
            <div style={{ marginTop: "1.5rem", fontSize: "0.9rem" }}>
              Belum punya akun?{" "}
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "black" }}
              >
                <strong>Sign Up</strong>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
