import * as React from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "./ResetPassword.css";

import { useQuery } from "@tanstack/react-query";
import {
  getCustomer,
  getCustomers,
  updateCustomer,
} from "../../services/customer";
import emailjs from "@emailjs/browser";
import { notifications } from "@mantine/notifications";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isFetching } = useQuery(
    ["get-customer", id],
    () => getCustomer(id || ""),
    { enabled: !!id }
  );

  const { data: dataCustomers, isFetching: isFetchingCustomers } = useQuery(
    ["get-customers"],
    () => getCustomers()
  );

  const [isConfirm, setIsConfirm] = React.useState(false);

  const [errorMessagesEmail, setErrorMessagesEmail] = React.useState("");
  const [errorMessagesPassword, setErrorMessagesPassword] = React.useState("");
  const [errorMessagesConfirmPassword, setErrorMessagesConfirmPassword] =
    React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const errors = {
    email: "Email yang anda masukkan tidak ditemukan",
    emailInvalid: "Invalid Email",
    disabled: "Email ini telah di-nonaktifkan",
    passwordInvalid: "Password minimal 8 karakter dengan setidaknya satu huruf kapital, satu huruf kecil, satu angka, dan satu karakter khusus",
    confirmpassInvalid: "Password yang dimasukkan tidak sama dengan Password Baru",
    null: "Harap diisi",
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/.test(
      password
    );
  }

  function isValidConfirmPassword(confirm_password, password) {
    return confirm_password === password;
  }

  const handleChangeEmail = (event) => {
    if (!isValidEmail(event.target.value)) {
      setErrorMessagesEmail(errors.emailInvalid);
    } else {
      setErrorMessagesEmail("");
    }
  };

  const handleChangePassword = (event) => {
    if (!isValidPassword(event.target.value)) {
      setErrorMessagesPassword(errors.passwordInvalid);
    } else {
      setErrorMessagesPassword("");
    }
  };

  const handleChangeConfirmPassword = (event) => {
  const { password } = document.forms[0];
  if (!isValidConfirmPassword(event.target.value, password.value)) {
    setErrorMessagesConfirmPassword(errors.confirmpassInvalid);
  } else {
    setErrorMessagesConfirmPassword("");
  }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (id) {
      var { password, confirm_password } = document.forms[0];
      if (password.value === "") {
        setErrorMessagesPassword(errors.null);
      }
      else if (confirm_password.value === "") {
        setErrorMessagesConfirmPassword(errors.null);
      }
      else if (password.value === confirm_password.value) {
        updateCustomer(id, {
          password: password.value,
          email: data.user.email,
          nama: data.user.nama,
          nomor_telepon: data.user.nomor_telepon,
        });
        notifications.show({
          title: "Ganti Password",
          message: "Berhasil Ganti Password",
          color: "teal",
        });

        navigate('/login');
      }
    } else {
      var { email } = document.forms[0];

      // Find user info
      const userData = dataCustomers.data.find(
        (cust) => cust.email === email.value
      );

      if (email.value === "") setErrorMessagesEmail(errors.null);
      else if (!isValidEmail(email.value))
        setErrorMessagesEmail(errors.emailInvalid);
      else if (userData) {
        var templateParams = {
          email: email.value,
          nama: userData.nama,
          id_customer: userData.id,
        };

        emailjs
          .send(
            "service_53s5rrf",
            "template_pwmvk2b",
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
        setIsConfirm(true);
      } else {
        // Email not found
        setErrorMessagesEmail(errors.email);
      }
    }
    // setErrorMessagesEmail("");
    // setErrorMessagesPassword("");

    // var { email, password } = document.forms[0];

    // // Find user info
    // const userData = data.user.find((cust) => cust.email === email.value);

    // if (email.value === "" || password.value === "") {
    //   if (email.value === "") setErrorMessagesEmail(errors.null);
    //   if (password.value === "") setErrorMessagesPassword(errors.null);
    // } else if (userData) {
    //   // Invalid password
    //   if (userData.password !== password.value)
    //     return setErrorMessagesPassword(errors.password);

    //   // Disabled User
    //   if (userData.disabled === "1")
    //     return setErrorMessagesEmail(errors.disabled);

    //   if (email.value !== "" || password.value !== "")
    //     if (userData.token) {
    //       // Have token
    //       navigate("/confirmation-token", {
    //         state: { email: userData.email, fromLogin: true },
    //       });
    //     } else if (userData.isCustomer) {
    //       localStorage.setItem("isLoged", true);
    //       localStorage.setItem("email", email.value);
    //       localStorage.setItem("idCustomer", userData.id);
    //       navigate("/");
    //     } else if (userData.isAdmin) {
    //       localStorage.setItem("isAdmin", true);
    //       localStorage.setItem("idAdmin", userData.id);
    //       navigate("/admin");
    //     }
    // } else {
    //   // Email not found
    //   setErrorMessagesEmail(errors.email);
    //   setErrorMessagesPassword("");
    // }
  };

  const renderErrorMessageEmail = () =>
    errorMessagesEmail && <div className="error">{errorMessagesEmail}</div>;

  const renderErrorMessagePassword = () =>
    errorMessagesPassword && (
      <div className="error">{errorMessagesPassword}</div>
    );

  const renderErrorMessageConfirmPassword = () =>
    errorMessagesConfirmPassword && (
      <div className="error">{errorMessagesConfirmPassword}</div>
    );

  return (
    <div className="reset-password">
      {isFetching && isFetchingCustomers ? (
        <></>
      ) : (
        <div className="reset-password-form">
          <div className="logo">
            <img src={logo} alt="logo" className="logoImage"></img>
          </div>
          <div className="input">
            <div className="title">Reset Password</div>
            <div className="form">
              {id ? (
                <form onSubmit={handleSubmit}>
                  Masukkan Password baru untuk {data.user.email}
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
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        name="password"
                        onChange={handleChangePassword}
                      />
                    </FormControl>
                    {renderErrorMessagePassword()}
                    <div className="input-container">
                      <FormControl variant="outlined">
                        <InputLabel
                          htmlFor="outlined-adornment-password"
                          error={errorMessagesConfirmPassword}
                        >
                          Ulangi Password
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-confirm-password"
                          type={showPassword ? "text" : "password"}
                          error={errorMessagesConfirmPassword}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Ulangi Password"
                          name="confirm_password"
                          onChange={handleChangeConfirmPassword}
                        />
                      </FormControl>
                      {renderErrorMessageConfirmPassword()}
                    </div>
                    <div className="button-container">
                      <input
                        type="submit"
                        value="CONFIRM"
                        className="button-submit"
                      />
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  {isConfirm ? (
                    <div
                      style={{
                        height: "10vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Harap cek Email anda untuk Link Reset Password!
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      Harap masukkan email anda untuk dikirimkan link Reset
                      Password:
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
                      <div className="button-container">
                        <input
                          type="submit"
                          value="CONFIRM"
                          className="button-submit"
                        />
                      </div>
                    </form>
                  )}
                  <div
                    style={{
                      marginTop: "1.5rem",
                      fontSize: "0.9rem",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Kembali ke halaman
                    <Link
                      to="/login"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        marginLeft: 4,
                      }}
                    >
                      <strong>Log In</strong>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
