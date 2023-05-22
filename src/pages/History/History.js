import { Box, Tab } from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SupportEngine from "../../SupportEngine";

import "./History.css";
import { useState } from "react";
import invoice from "../../utils/assets/invoice.svg"
import appointment from "../../utils/assets/appointment.svg"

const History = () => {
  const isLoged = localStorage.getItem("isLoged");

  const [currentTab, setCurrentTab] = useState("1");

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id.slice(-1));
  };

  return (
    <div className="history">
      <Navbar />
      <div className="historyContent">
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList centered>
              <Tab label="Invoice" value="1" onClick={handleTabClick} />
              <Tab label="Appointment" value="2" onClick={handleTabClick} />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <p style={{fontSize: "2rem"}}>Kamu tidak memiliki Riwayat Invoice</p>
              <img src={invoice} style={{width: "50vw", height: "50vh"}}></img>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <p style={{fontSize: "2rem"}}>Kamu tidak memiliki Riwayat Appointment</p>
              <img src={appointment} style={{width: "50vw", height: "50vh"}}></img>
            </div>
          </TabPanel>
        </TabContext>
      </div>
      <Footer />
      {isLoged === "true" ? <SupportEngine /> : ""}
    </div>
  );
};

export default History;
