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

import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

const SignUp = () => {
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

  const insertCustomer = async (email, nama, nomor, password) => {
    try {
      await addDoc(collection(db, "customer"), {
        email: email,
        nama: nama,
        nomor_telepon: nomor,
        password: password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const errors = {
    email: "Email telah terdaftar",
    null: "Harap diisi",
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { email, nama, nomor, password } = document.forms[0];

    // Find user signup info
    const userData = customer.find((cust) => cust.email === email.value);

    // Compare user info
    if (userData) {
      setErrorMessages({ name: "email", message: errors.email });
    }
    if (email.value === "") {
      setErrorMessages({ name: "email", message: errors.null });
    } 
    if (nama.value === "") {
      setErrorMessages({ name: "nama", message: errors.null });
    } 
    if (nomor.value === "") {
      setErrorMessages({ name: "nomor", message: errors.null });
    }
    if (password.value === "") {
      setErrorMessages({ name: "password", message: errors.null });
    } else {
      insertCustomer(email.value, nama.value, nomor.value, password.value);
      navigate("/login");
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
                  error={errorMessages.name === "email"}
                />
                {renderErrorMessage("email")}
              </div>
              <div className="input-container">
                <TextField
                  id="outlined-basic"
                  label="Nama Lengkap"
                  variant="outlined"
                  name="nama"
                  error={errorMessages.name === "nama"}
                />
              </div>
              <div className="input-container">
                <TextField
                  id="outlined-basic"
                  label="Nomor Telepon"
                  variant="outlined"
                  name="nomor"
                  error={errorMessages.name === "nomor"}
                />
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
