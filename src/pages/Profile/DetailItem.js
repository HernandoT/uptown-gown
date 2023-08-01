import { Flex, Paper, Text } from "@mantine/core";
import Separator from "../../components/separator";
import Divider from "@mui/material/Divider";
import logo from "../../utils/assets/logo.png";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import html2pdf from "html2pdf.js";
import dayjs from "dayjs";
import "dayjs/locale/id";
import * as React from "react";
import ReactDOM from "react-dom";
import { ConsoleSqlOutlined } from "@ant-design/icons";

const DetailItem = ({ invoice, dataCustomer }) => {
  const [viewportSize, setViewportSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setViewportSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  React.useEffect(() => {
    // Add event listener to listen for window resize
    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function currencyFormat(num) {
    return "Rp. " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  const idnDayjs = dayjs().locale("id");

  const invoiceContent = (
    <div id="invoice-container">
      <div style={{ display: "flex" }}>
        <div className="di-header-left">
          <div className="detail-invoice-title">Invoice</div>
          <p>No. Invoice: {invoice.id}</p>
          <p>
            Tanggal: {dayjs(invoice.waktu_buat.toDate()).format("DD/MM/YYYY")}
          </p>
          <p>
            Jenis:{" "}
            {invoice.id_jenis_invoice === "rent"
              ? "Rent"
              : invoice.id_jenis_invoice === "custom_rent"
              ? "Custom Rent"
              : "Custom Made"}
          </p>
          <p style={{ marginBottom: "16px" }}>
            Tanggal Acara: {dayjs(invoice.tanggal_acara).format("DD/MM/YYYY")}
          </p>
          <p style={{ fontWeight: "bold" }}>Kepada :</p>
          <p>{dataCustomer.user.nama}</p>
          <p>{dataCustomer.user.email}</p>
        </div>
        <div className="di-header-right">
          <div class="detail-invoice-image-container">
            <img src={logo} alt="logo" class="detail-invoice-image" />
          </div>
          <div className="detail-invoice-company-name">UPTOWN GOWN</div>
          <p>Jl. Gatot Subroto Jl. Taman Komp. Tomang Elok Blok C No.123</p>
          <p>Contact: +6282165828164</p>
        </div>
      </div>
      <Separator _gap={32} />
      <TableContainer>
        <Table className="detail-invoice-table">
          <TableHead>
            <TableRow>
              <TableCell>Nama Barang</TableCell>
              <TableCell align="right">Harga</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nama_item}</TableCell>
                <TableCell align="right">
                  {currencyFormat(item.harga)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Separator _gap={32} />
      <div style={{ display: "flex" }}>
        <div className="di-left">
          <p>Panjar: {currencyFormat(invoice.panjar)}</p>
          <p>Deposit: {currencyFormat(invoice.deposit)}</p>
          <p style={{marginTop:"24px"}}>Status Pelunasan:</p>
          <p style={{ fontSize: "20px"}}>
            <b>{invoice.status_pelunasan}</b>
          </p>
          <p style={{marginBottom:"16px"}}>
          { invoice.status_pelunasan === "Belum Lunas" ?
            "(Sisa panjar belum dibayarkan)" :
            invoice.status_pelunasan === "Lunas" ?
            "(Pelunasan pada " + dayjs(invoice.waktu_lunas.toDate()).format("DD/MM/YYYY") + ")" :
            ""
          }</p>
          {/* <p>Tanggal Lunas: {invoice.waktu_lunas === null ? "-" : dayjs(invoice.waktu_lunas.toDate()).format("DD/MM/YYYY")}</p>
          <p>Tanggal Selesai: {invoice.status_pelunasan === "Selesai" ? dayjs(invoice.waktu_ubah.toDate()).format("DD/MM/YYYY") : "-"}</p> */}
        </div>
        <div className="di-mid">
          <p>
            <b>Subtotal</b>
          </p>
          <p>
            <b>Diskon</b>
          </p>
          <p>
            <b>Biaya Tambahan</b>
          </p>
          <Divider />
          <p className="detail-invoice-total">
            <b>Total</b>
          </p>
        </div>
        <div className="di-right">
          <p>
            <b>{currencyFormat(invoice.harga_total)}</b>
          </p>
          <p>
            <b>- {currencyFormat(invoice.diskon)}</b>
          </p>
          <p>
            <b>{currencyFormat(invoice.biaya_tambahan)}</b>
          </p>
          <Divider />
          <p className="detail-invoice-total">
            <b>{currencyFormat(invoice.total_pembayaran)}</b>
          </p>
        </div>
      </div>
      <Separator _gap={32} />
      <Divider />
      <Separator _gap={18} />
      <p>Keterangan: {invoice.keterangan}</p>
      <Separator _gap={56} />
      <p style={{ margin: "0" }}>
        <b>Terima Kasih</b>
      </p>
      <p style={{ margin: "0" }}>
        Dokumen elektronik ini adalah bukti pembayaran yang sah.
      </p>
    </div>
  );

  const InvoiceWithFooter = () => {
    const InvoiceFooter = () => (
      <div
        style={{ textAlign: "right", fontSize: "10px", fontStyle: "italic" }}
      >
        <div>
          Update terakhir:{" "}
          {dayjs(invoice.waktu_ubah.toDate()).locale("id").format("D MMMM YYYY HH:mm [WIB]")}
        </div>
        <div>Dicetak pada: {idnDayjs.format("D MMMM YYYY HH:mm [WIB]")}</div>
      </div>
    );
    return (
      <div>
        {invoiceContent}
        <InvoiceFooter />
      </div>
    );
  };

  const handleDownloadPDF = () => {
    const element = document.createElement("div");
    ReactDOM.render(<InvoiceWithFooter invoice={invoice} />, element);
    html2pdf()
      .set({ margin: 10, filename: "invoice.pdf" })
      .from(element)
      .save();
  };

  return (
    <Paper p={(viewportSize.width > 600) ? 36 : 12} miw={(viewportSize.width > 600) ? 400 : 350}>
      <Flex direction="column">
        <Text fz={20} fw={600}>
          Detail Invoice
          <button
            className="profile-ubah-kata-sandi"
            style={{ float: "right", width: "fit-content" }}
            onClick={handleDownloadPDF}
          >
            DOWNLOAD PDF
          </button>
        </Text>
        <Separator _gap={18} />
        <Divider />
        <Separator _gap={18} />
        {invoiceContent}
      </Flex>
    </Paper>
  );
};

export default DetailItem;
