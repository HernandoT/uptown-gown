import * as React from "react";
import { Box, Tab, Card, CardContent } from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SupportEngine from "../../SupportEngine";
import "./Profile.css";
import { useState } from "react";
import invoice from "../../utils/assets/invoice.svg";
import appointment from "../../utils/assets/appointment.svg";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../../services/appointment";
import { MdPending, MdCheckCircle, MdCancel } from "react-icons/md";
import { getInvoicesByIdCustomer } from "../../services/invoice";
import { getDetailInvoiceItems } from "../../services/detail-invoice-item";
import { modals } from "@mantine/modals";
import DetailItem from "./DetailItem";
import { getCollections } from "../../services/collection";
import { getCustomer } from "../../services/customer";
import EditProfile from "../EditProfile/EditProfile";

const Profile = () => {
  const isLoged = localStorage.getItem("isLoged");
  const idCustomer = localStorage.getItem("idCustomer");
  const [appointments, setAppointments] = React.useState([]);
  const [invoices, setInvoices] = React.useState([]);
  const [isInitiate, setIsInitiate] = React.useState(false);

  const { data, isFetching } = useQuery(["get-appointments"], () =>
    getAppointments()
  );
  const { data: dataInvoices, isFetching: isFetchingInvoices } = useQuery(
    ["get-invoices-by-id-customer"],
    () => getInvoicesByIdCustomer(idCustomer)
  );
  const { data: dataDetailItems, isFetching: isFetchingDetailItems } = useQuery(
    ["get-detail-invoice-items"],
    () => getDetailInvoiceItems()
  );
  const { data: dataCollections, isFetching: isFetchingCollections } = useQuery(
    ["get-collections"],
    () => getCollections()
  );

  const { data: dataCustomer, isFetching: isFetchingCustomer } = useQuery(
    ["get-customer", idCustomer],
    () => getCustomer(idCustomer || ""),
    { enabled: !!idCustomer }
  );

  const [currentTab, setCurrentTab] = useState("1");

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id.slice(-1));
  };

  React.useEffect(() => {
    if (
      !isFetching &&
      !isFetchingInvoices &&
      !isFetchingDetailItems &&
      !isFetchingCollections &&
      !isFetchingCustomer
    ) {
      const foundHistory = data?.data.filter(
        (item) => item.id_customer === idCustomer
      );
      foundHistory.sort((a, b) => {
        if (a.status === b.status) {
          return new Date(b.tanggal) - new Date(a.tanggal);
        }
        return a.status - b.status;
      });
      setAppointments(foundHistory);

      const invoiceWithDetailItems = [];
      dataInvoices?.invoices.map((invoice) => {
        const items = [];
        dataDetailItems.data
          .filter((items) => items.id_invoice === invoice.id)
          .map((item) => {
            const idCollection = item.id_collection;
            if (idCollection) {
              const findCollection = dataCollections.data.find((collection) => {
                return collection.id === idCollection;
              });
              item.nama_item = findCollection.nama;
            }
            items.push(item);
          });
        invoice.items = items;
        invoiceWithDetailItems.push(invoice);
      });
      setInvoices(invoiceWithDetailItems);
      setIsInitiate(true);
    }
  }, [
    data?.data,
    idCustomer,
    isFetching,
    isFetchingInvoices,
    isFetchingDetailItems,
    isFetchingCollections,
    isFetchingCustomer,
  ]);

  const onClickDetailItem = (invoice, dataCustomer) => () => {
    modals.open({
      size: "xl",
      centered: true,
      withCloseButton: false,
      children: <DetailItem invoice={invoice} dataCustomer={dataCustomer} />,
    });
  };

  function currencyFormat(num) {
    return "Rp. " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <div className="history">
      <Navbar />
      {!isInitiate ? (
        <></>
      ) : (
        <div className="historyContent">
          <TabContext value={currentTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList centered>
                <Tab
                  label="Profile"
                  value="1"
                  onClick={handleTabClick}
                  style={{ fontSize: "1.5rem" }}
                />
                <Tab
                  label="Invoice"
                  value="2"
                  onClick={handleTabClick}
                  style={{ fontSize: "1.5rem" }}
                />
                <Tab
                  label="Appointment"
                  value="3"
                  onClick={handleTabClick}
                  style={{ fontSize: "1.5rem" }}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <EditProfile />
            </TabPanel>
            <TabPanel value="2">
              {invoices?.length > 0 ? (
                <div style={{ minHeight: "60vh" }}>
                  {invoices.map((invoice) => {
                    return (
                      <Card
                        className="card card-container"
                        variant="outlined"
                        onClick={onClickDetailItem(invoice, dataCustomer)}
                        style={{ cursor: "pointer" }}
                      >
                        <CardContent className="card-content">
                          <div style={{ display: "flex" }}>
                            <div className="card-left">
                              <p>
                                <b>Tanggal Acara:</b>{" "}
                                {new Date(
                                  invoice.tanggal_acara
                                ).toLocaleDateString("en-GB")}
                              </p>
                              <p>
                                <b>Harga Total:</b>{" "}
                                {currencyFormat(invoice.harga_total)}
                              </p>
                              <p>
                                <b>Jenis Inovoice:</b>{" "}
                                {invoice.id_jenis_invoice === "rent"
                                  ? "Rent"
                                  : invoice.id_jenis_invoice === "custom_rent"
                                  ? "Custom Rent"
                                  : "Custom Made"}
                              </p>
                            </div>
                            <div className="card-right">
                              <div className="card-status">
                                {invoice.status_pelunasan}
                              </div>
                              <div style={{textAlign: "center"}}>
                                {invoice.status_pelunasan === "Belum Lunas"
                                  ? "Ambil baju pada saat H-2 dari Tanggal Acara"
                                  : invoice.status_pelunasan === "Lunas"
                                  ? "Kembalikan baju paling lama H+2 dari Tanggal Acara"
                                  : "Terima Kasih telah mempercayakan kami pada acara anda"}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
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
              )}
            </TabPanel>
            <TabPanel value="3">
              {appointments?.length > 0 ? (
                <div style={{ minHeight: "60vh" }}>
                  {appointments.map((data) => {
                    return (
                      <Card className="card card-container" variant="outlined">
                        <CardContent className="card-content">
                          <div style={{ display: "flex" }}>
                            <div className="card-left">
                              <p>
                                <b>Tanggal Appointment:</b>{" "}
                                {new Date(data.tanggal).toLocaleDateString(
                                  "en-GB"
                                )}
                              </p>
                              <p>
                                {data.keterangan}
                              </p>
                            </div>
                            <div className="card-right">
                              {data.status === 1 ? (
                                <div className="card-status">
                                  PENDING
                                  <MdPending style={{ color: "orange" }} />
                                </div>
                              ) : data.status === 2 ? (
                                <div className="card-status">
                                  DITERIMA
                                  <MdCheckCircle style={{ color: "green" }} />
                                </div>
                              ) : (
                                <div className="card-status">
                                  DITOLAK
                                  <MdCancel style={{ color: "red" }} />
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
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
      )}
      <Footer />
      {isLoged === "true" ? <SupportEngine /> : ""}
    </div>
  );
};

export default Profile;
