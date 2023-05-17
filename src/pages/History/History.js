import { Box, Tab } from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./History.css";
import { useState } from "react";

const History = () => {
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
              <Tab label="Invoice" value="1" onClick={handleTabClick}/>
              <Tab label="Appoitnment" value="2" onClick={handleTabClick}/>
            </TabList>
          </Box>
          <TabPanel value="1">Item Invoice</TabPanel>
          <TabPanel value="2">Item Appointment</TabPanel>
        </TabContext>
      </div>
      <Footer />
    </div>
  );
};

export default History;
