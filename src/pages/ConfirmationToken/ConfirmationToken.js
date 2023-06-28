import * as React from "react";
import { TextField } from "@mui/material";
import logo from "../../utils/assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmationToken.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import emailjs from "@emailjs/browser";
import { updateCustomer } from "../../services/customer";
import { notifications } from "@mantine/notifications";

const ConfirmationToken = () => {
  const { state } = useLocation();
  const { email, fromLogin } = state;
  const [customer, setCustomer] = React.useState([]);
  const [errorMessages, setErrorMessages] = React.useState({});
  const navigate = useNavigate();

  const fetchCustomerByEmail = async () => {
    try {
      const collectionRef = collection(db, "customer");
      const q = query(collectionRef, where("email", "==", email));
      const docRefs = await getDocs(q);

      const customer = [];

      docRefs.forEach((cust) => {
        customer.push({
          id: cust.id,
          ...cust.data(),
        });
      });

      setCustomer(customer);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchCustomerByEmail();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    var { token } = document.forms[0];

    const dataCustomer = customer[0];
    if (token.value === dataCustomer.token) {
      updateCustomer(dataCustomer.id, {
        email: dataCustomer.email,
        password: dataCustomer.password,
        nama: dataCustomer.nama,
        nomor_telepon: dataCustomer.nomor_telepon,
        token: "",
      });
      if (fromLogin) navigate("/");
      else navigate("/login");
    } else setErrorMessages({ name: "token", message: errors.token });
  };

  const errors = {
    token: "Token yang diinput salah",
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const resendEmail = () => {
    const dataCustomer = customer[0];
    var templateParams = {
      email: dataCustomer.email,
      nama: dataCustomer.nama,
      token: dataCustomer.token,
    };

    emailjs
      .send(
        "service_53s5rrf",
        "template_15wxof6",
        templateParams,
        "C4ktx7lrffBSEAByY"
      )
      .then(
        (result) => {
          console.log(result)
          notifications.show({
            title: "Send Email",
            message: "Email telah berhasil dikirimkan, harap cek email",
            color: "teal",
          });
        },
        (error) => {
          console.log(error);
          notifications.show({
            title: "Send Email",
            message: "Email gagal dikirimkan ulang",
            color: "red",
          });
        }
      );
  };

  return (
    <div className="confirmation-token">
      <div className="confirmation-token-form">
        <div className="logo">
          <img src={logo} alt="logo" className="logoImage"></img>
        </div>
        <div className="input">
          <div className="title">Confirmation Token</div>
          <div className="form">
            <div>Konfirmasi pembuatan akun untuk: {email}</div>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <TextField
                  id="outlined-basic"
                  label="Token"
                  variant="outlined"
                  name="token"
                  error={errorMessages.name === "token"}
                />
                {renderErrorMessage("token")}
              </div>
              <div className="button-container">
                <input type="submit" value="SUBMIT" className="button-submit" />
              </div>
            </form>
          </div>
          <div style={{ marginTop: "2rem", fontSize: "0.9rem" }}>
            Tidak menerima Email?{" "}
            <span onClick={resendEmail}>
              <strong>Tekan untuk kirim ulang</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationToken;
