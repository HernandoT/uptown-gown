import * as React from "react";
import { Box, Tab, Card, CardContent } from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SupportEngine from "../../SupportEngine";
import "./History.css";
import { useState } from "react";
import invoice from "../../utils/assets/invoice.svg";
import appointment from "../../utils/assets/appointment.svg";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../../services/appointment";
import { MdPending, MdCheckCircle, MdCancel } from "react-icons/md";

const History = () => {
  const isLoged = localStorage.getItem("isLoged");
  const idCustomer = localStorage.getItem("idCustomer");
  const [appointments, setAppointments] = React.useState([]);

  const { data, isFetching } = useQuery(["get-appointments"], () =>
    getAppointments()
  );

  const [currentTab, setCurrentTab] = useState("1");

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id.slice(-1));
  };

  React.useEffect(() => {
    if (!isFetching) {
      const foundHistory = data?.data.filter((item) => item.id_customer === idCustomer);
      foundHistory.sort((a, b) => {
        if (a.status === b.status) {
          return new Date(b.tanggal) - new Date(a.tanggal);
        }
        return a.status - b.status;
      });
      setAppointments(foundHistory);
    }}, [data?.data, idCustomer,isFetching]);

  return (
    <div className="history">
      <Navbar />
      <div className="historyContent">
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList centered>
              <Tab
                label="Invoice"
                value="1"
                onClick={handleTabClick}
                style={{ fontSize: "1.5rem" }}
              />
              <Tab
                label="Appointment"
                value="2"
                onClick={handleTabClick}
                style={{ fontSize: "1.5rem" }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: "2rem" }}>
                Kamu tidak memiliki Riwayat Invoice
              </p>
              <img
                src={invoice}
                style={{ width: "50vw", height: "50vh" }}
                alt="No Invoice"
              ></img>
            </div>
          </TabPanel>
          <TabPanel value="2">
            {appointments?.length > 0 ? (
            <> 
            <div className="data-list-appointment">
              {appointments.map((data) => {
                return(
                  <Card className="card-appointment" variant="outlined">
                    <CardContent className="card-content-appointment">
                    <div style={{display:"flex"}}>
                      <div className="card-appointment-left">
                        <p><b>Tanggal Appointment:</b> {new Date(data.tanggal).toLocaleDateString('en-GB')}</p>
                        <p><b>Keterangan:</b> {data.keterangan}</p>
                      </div>
                      <div className="card-appointment-right">
                        {data.status === 1 ? (
                          <div className="card-appointment-status">PENDING
                            <MdPending style={{color:"orange"}}/>
                          </div>
                        ) : data.status === 2 ? (
                          <div className="card-appointment-status">DITERIMA
                            <MdCheckCircle style={{color:"green"}}/>
                          </div>
                        ) : (
                          <div className="card-appointment-status">DITOLAK
                            <MdCancel style={{color:"red"}}/>
                          </div>
                        )}
                      </div>
                    </div>
                    </CardContent>
                  </Card>
                )})}
            </div>
            </>
            ) : (
            <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: "2rem" }}>
                Kamu tidak memiliki Riwayat Appointment
              </p>
              <img
                src={appointment}
                style={{ width: "50vw", height: "50vh" }}
                alt="No Appointments"
              ></img>
            </div>
            </>
            )}
          </TabPanel>
        </TabContext>
      </div>
      <Footer />
      {isLoged === "true" ? <SupportEngine /> : ""}
    </div>
  );
};

export default History;
