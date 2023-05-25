import { Flex, Paper, Text } from "@mantine/core";
import { Button, Modal, TextField } from "@mui/material";
import * as React from "react";
import Separator from "../../components/separator";
import { notifications } from "@mantine/notifications";

import { createColor } from "../../services/color";

const FilterColorForm = ({
  data = { nama: "", kode: "" },
  open = true,
  onClose,
}) => {
  const [nama, setNama] = React.useState(data.nama);
  const [kode, setKode] = React.useState(data.kode);

  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      try {
        createColor({ nama_warna: nama, kode_hex: kode });
        notifications.show({
          title: "Tambah Warna",
          message: "Warna baru telah berhasil ditambahkan",
          color: "teal",
        });
        onClose();
      } catch {
        notifications.show({
          title: "Tambah Warna",
          message: "Warna baru gagal ditambahkan",
          color: "red",
        });
      } finally {
      }
    },
    [nama, kode, onClose]
  );

  return (
    <Modal open={open}>
      <Paper
        p={36}
        miw={400}
        style={{
          transform: "translate(-50%, -50%)",
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        <form onSubmit={onSubmit}>
          <Flex direction="column">
            <Text fz={20} fw={600}>
              Tambah Warna
            </Text>
            <Separator _gap={24} />

            <TextField
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              label="Nama Warna"
              required
            />
            <Separator _gap={24} />
            <TextField
              value={kode}
              onChange={(e) => setKode(e.target.value)}
              label="Kode Hex"
              required
            />
            <Separator _gap={24} />

            <Flex justify="flex-end">
              <Button variant="text" color="error" onClick={onClose}>
                Batal
              </Button>
              <Button variant="text" type="submit">
                Simpan
              </Button>
            </Flex>
          </Flex>
        </form>
      </Paper>
    </Modal>
  );
};

export default FilterColorForm;
