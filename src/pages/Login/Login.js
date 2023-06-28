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

const Login = () => {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
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
    email: "Invalid Email",
    password: "Invalid Password",
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    var { email, password } = document.forms[0];

    // Find user login info
    const userData = customer.find((cust) => cust.email === email.value);

    // Compare user info
    if (userData) {
      if (userData.password !== password.value) {
        // Invalid password
        setErrorMessages({ name: "password", message: errors.password });
      } else {
        localStorage.setItem("isLoged", true);
        localStorage.setItem("email", email.value);
        localStorage.setItem("idCustomer", userData.id);
        navigate("/");
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
                  label="Email"
                  variant="outlined"
                  name="email"
                  error={errorMessages.name === "email"}
                />
                {renderErrorMessage("email")}
              </div>
              <div className="input-container">
                <FormControl variant="outlined">
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    error={errorMessages.name === "password"}
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    error={errorMessages.name === "password"}
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
          <div style={{ marginTop: "2rem", fontSize: "0.9rem" }}>
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
    </div>
  );
};

export default Login;
