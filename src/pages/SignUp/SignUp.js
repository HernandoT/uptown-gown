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
      console.log(email, nama, nomor, password);
    } catch (err) {
      console.log(err);
    }
  };

  const errors = {
    email: "email telah terdaftar",
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
                <input
                  type="submit"
                  value="BUAT AKUN"
                  className="button-submit"
                />
              </div>
            </form>
          </div>
          <div style={{marginTop: "2rem", fontSize: "0.9rem"}}>
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
