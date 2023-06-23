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
import { getInvoicesByIdCustomer } from "../../services/invoice";
import { getDetailInvoiceItems } from "../../services/detail-invoice-item";
import { modals } from "@mantine/modals";
import DetailItem from "./DetailItem";
import { getCollections } from "../../services/collection";

const History = () => {
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

  const [currentTab, setCurrentTab] = useState("1");

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id.slice(-1));
  };

  React.useEffect(() => {
    if (
      !isFetching &&
      !isFetchingInvoices &&
      !isFetchingDetailItems &&
      !isFetchingCollections
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
    isFetchingCollections
  ]);

  const onClickDetailItem = (invoice) => () => {
    modals.open({
      size: 600,
      centered: true,
      withCloseButton: false,
      children: <DetailItem invoice={invoice} />,
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
              {invoices?.length > 0 ? (
                <div style={{ minHeight: "60vh" }}>
                  {invoices.map((invoice) => {
                    return (
                      <Card
                        className="card"
                        variant="outlined"
                        onClick={onClickDetailItem(invoice)}
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
                                <b>Status Pelunasan:</b>{" "}
                                {invoice.status_pelunasan}
                              </p>
                            </div>
                            <div className="card-right">
                              {invoice.id_jenis_invoice === "rent" ? (
                                <div className="card-status">RENT</div>
                              ) : invoice.id_jenis_invoice === "custom_rent" ? (
                                <div className="card-status">CUSTOM RENT</div>
                              ) : (
                                <div className="card-status">CUSTOM MADE</div>
                              )}
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
            <TabPanel value="2">
              {appointments?.length > 0 ? (
                <div style={{ minHeight: "60vh" }}>
                  {appointments.map((data) => {
                    return (
                      <Card className="card" variant="outlined">
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
                                <b>Keterangan:</b> {data.keterangan}
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

export default History;
