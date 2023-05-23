import React, { useState } from "react";
import {
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "../../utils/assets/logo.png";
import { useNavigate } from "react-router-dom";

import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const database = [
    {
      email: "user1@gmail.com",
      password: "pass1",
    },
    {
      email: "user2@gmail.com",
      password: "pass2",
    },
  ];

  const errors = {
    email: "invalid email",
    password: "invalid password",
  };

  const goPreviousPage = () => {
    navigate(-1);
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { email, password } = document.forms[0];

    // Find user signup info
    const userData = database.find((user) => user.email === email.value);

    // Compare user info
    if (userData) {
      if (userData.password !== password.value) {
        // Invalid password
        setErrorMessages({ name: "password", message: errors.password });
      } else {
        localStorage.setItem("isLoged", true);
        localStorage.setItem("email", email.value)
        goPreviousPage();
      }
    } else {
      // Username not found
      setErrorMessages({ name: "email", message: errors.email });
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
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
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                />
                {renderErrorMessage("email")}
              </div>
              <div className="input-container">
                <TextField
                  id="outlined-basic"
                  label="Nama Lengkap"
                  variant="outlined"
                  name="nama"
                />
              </div>
              <div className="input-container">
                <TextField
                  id="outlined-basic"
                  label="Nomor Telepon"
                  variant="outlined"
                  name="nomor"
                />
              </div>
              <div className="input-container">
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
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
                    label="Password"
                    name="password"
                  />
                </FormControl>
                {renderErrorMessage("password")}
              </div>
              <div className="button-container">
                <input type="submit" value="LOGIN" className="button-submit" />
              </div>
            </form>
          </div>
          <div>
            Sudah punya akun? <strong>Log In</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;