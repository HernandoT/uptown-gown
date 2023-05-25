import { Flex, Paper, Text } from "@mantine/core";
import { Button, Modal, TextField } from "@mui/material";
import * as React from "react";
import Separator from "../../components/separator";
import { notifications } from "@mantine/notifications";

import { createType } from "../../services/type";

const FilterTypeForm = ({ data = { nama: "" }, open = true, onClose }) => {
  const [nama, setNama] = React.useState(data.nama);

  // const insertType = async (nama) => {
  //   try {
  //     await addDoc(collection(db, "jenis")ß {
  //       nama_jenis: nama,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      try {
        createType({ nama_jenis: nama });
        notifications.show({
          title: "Tambah Jenis",
          message: "Jenis baru telah berhasil ditambahkan",
          color: "teal",
        });
        onClose();
      } catch {
        notifications.show({
          title: "Tambah Jenis",
          message: "Jenis baru gagal ditambahkan",
          color: "red",
        });
      } finally {
      }
    },
    [nama, onClose]
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
              Tambah Jenis
            </Text>
            <Separator _gap={24} />

            <TextField
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              label="Nama Jenis"
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

export default FilterTypeForm;
