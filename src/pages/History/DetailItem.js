import { Flex, Paper, Text } from "@mantine/core";
import Separator from "../../components/separator";

const DetailItem = ({ invoice }) => {
  function currencyFormat(num) {
    return "Rp. " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <Paper p={36} miw={400}>
      <Flex direction="column">
        <Text fz={20} fw={600}>
          Detail Invoice
        </Text>
        <Separator _gap={18} />
        <div>
          <p>
            <b>Jenis:</b>{" "}
            {invoice.id_jenis_invoice === "rent"
              ? "Rent"
              : invoice.id_jenis_invoice === "custom_rent"
              ? "Custom Rent"
              : "Custom Made"}
          </p>
          <p>
            <b>Tanggal Acara:</b>{" "}
            {new Date(invoice.tanggal_acara).toLocaleDateString("en-GB")}
          </p>
          <p>
            <b>Daftar Barang:</b>
          </p>
          {invoice.items.map((item) => {
            return (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ marginTop: 0 }}>{item.nama_item}</p>
                <p style={{ marginTop: 0 }}>{currencyFormat(item.harga)}</p>
              </div>
            );
          })}
          <p style={{ marginTop: 0 }}>
            <b>Harga Total:</b> {currencyFormat(invoice.harga_total)}
          </p>
          <p>
            <b>Panjar:</b> {currencyFormat(invoice.panjar)}
          </p>
          <p>
            <b>Deposit:</b> {currencyFormat(invoice.deposit)}
          </p>
          <p>
            <b>Biaya Tambahan:</b> {currencyFormat(invoice.biaya_tambahan)}
          </p>
          <p>
            <b>Status Pelunasan:</b> {invoice.status_pelunasan}
          </p>
          <p>
            <b>Keterangan:</b> {invoice.keterangan}
          </p>
        </div>
      </Flex>
    </Paper>
  );
};

export default DetailItem;
