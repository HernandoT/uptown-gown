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


const DetailItem = ({ invoice }) => {
  function currencyFormat(num) {
    return "Rp. " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  const jumlahtotal = invoice.harga_total + invoice.biaya_tambahan;

  const handleDownloadPDF = () => {
    const element = document.getElementById("invoice-container");

    html2pdf()
      .set({ margin: 10, filename: "invoice.pdf" })
      .from(element)
      .save();
  };

  return (
    <Paper p={36} miw={400}>
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
        <div id="invoice-container">
          <div style={{ display: "flex" }}>
            <div className="di-header-left">
              <div className="detail-invoice-title">Invoice</div>
              <p style={{ margin: "0" }}>No. Invoice: {invoice.id}</p>
              <p style={{ margin: "0" }}>Tanggal:</p>
              <p style={{ margin: "0" }}>
                Jenis:{" "}
                {invoice.id_jenis_invoice === "rent"
                  ? "Rent"
                  : invoice.id_jenis_invoice === "custom_rent"
                  ? "Custom Rent"
                  : "Custom Made"}
              </p>
              <p style={{ marginBottom: "16px" }}>
                Tanggal Acara:{" "}
                {dayjs(invoice.tanggal_acara).format("DD/MM/YYYY")}
              </p>
              <p style={{ fontWeight: "bold" }}>Kepada :</p>
              <div>nama user</div>
              <div>email@gmail.com</div>
            </div>
            <div className="di-header-right">
              <div class="detail-invoice-image-container">
                <img src={logo} alt="logo" class="detail-invoice-image" />
              </div>
              <div className="detail-invoice-company-name">UPTOWN GOWN</div>
              <div>
                Jl. Gatot Subroto Jl. Taman Komp. Tomang Elok Blok C No.123
              </div>
              <div>Contact: +6282165828164</div>
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

          <Separator _gap={8} />
          <p>Keterangan: {invoice.keterangan}</p>
          <Separator _gap={18} />
          <div style={{ display: "flex" }}>
            <div className="di-left">
              <p>Status Pelunasan:</p>
              <p style={{ fontSize: "20px" }}>
                <b>{invoice.status_pelunasan}</b>
              </p>
            </div>
            <div className="di-mid">
              <p>
                <b>Subtotal:</b>
              </p>
              <p>Panjar:</p>
              <p>Deposit:</p>
              <p>
                <b>Biaya Tambahan:</b>
              </p>
              <p style={{ fontSize: "20px" }}>
                <b>Total:</b>
              </p>
            </div>
            <div className="di-right">
              <p>
                <b>{currencyFormat(invoice.harga_total)}</b>
              </p>
              <p>{currencyFormat(invoice.panjar)}</p>
              <p>{currencyFormat(invoice.deposit)}</p>
              <p>
                <b>{currencyFormat(invoice.biaya_tambahan)}</b>
              </p>
              <p style={{ fontSize: "20px" }}>
                <b>{currencyFormat(jumlahtotal)}</b>
              </p>
            </div>
          </div>
        </div>
      </Flex>
    </Paper>
  );
};

export default DetailItem;
