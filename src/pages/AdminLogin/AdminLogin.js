import React, { useState } from "react";
import { TextField } from "@mui/material";
import logo from "../../utils/assets/logo.png";
import { useNavigate } from "react-router-dom";

import "./AdminLogin.css";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});

  const database = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const goPreviousPage = () => {
    navigate(-1);
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        localStorage.setItem("isLoged", true);
        goPreviousPage();
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  return (
    <div className="login">
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
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  name="uname"
                />
                {renderErrorMessage("uname")}
              </div>
              <div className="input-container">
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="pass"
                />
                {renderErrorMessage("pass")}
              </div>
              <div className="button-container">
                <input type="submit" value="LOGIN" className="buttonSubmit" />
              </div>
            </form>
          </div>
          <div>
            Belum punya akun? <strong>Sign Up</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
