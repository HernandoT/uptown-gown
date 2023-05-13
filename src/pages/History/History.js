import { Box, Tabs, Tab } from "@mui/material";
import { TabPanel } from "@mui/lab";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const History = () => {
  return (
    <div className="history">
      <Navbar />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs aria-label="basic tabs example">
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Box>
      <TabPanel index={0}>Item One</TabPanel>
      <TabPanel index={1}>Item Two</TabPanel>
      <TabPanel index={2}>Item Three</TabPanel>
      <Footer />
    </div>
  );
};

export default History;
