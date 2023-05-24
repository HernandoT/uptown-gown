import { Flex, Paper, Text } from "@mantine/core";
import { Button, Modal, TextField } from "@mui/material";
import * as React from "react";
import Separator from "../../components/separator";
import { notifications } from "@mantine/notifications";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { queryClient } from "../../services/query-client";

const CustomerForm = ({
  data = { email: "", name: "", phoneNumber: "" },
  open = true,
  onClose,
}) => {
  const [email, setEmail] = React.useState(data.email);
  const [name, setName] = React.useState(data.name);
  const [phoneNumber, setPhoneNumber] = React.useState(data.phoneNumber);

  const insertCustomer = async (email, nama, nomor, password) => {
    try {
      await addDoc(collection(db, "customer"), {
        email: email,
        nama: nama,
        nomor_telepon: nomor,
        password: password,
      });

      queryClient.refetchQueries(["get-customers"]);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      try {
        insertCustomer(email, name, phoneNumber, "123456");
        notifications.show({
          title: "Tambah User",
          message: "Customer telah berhasil ditambahkan",
          color: "teal",
        });
        onClose();
      } catch {
        notifications.show({
          title: "Tambah User",
          message: "Customer gagal ditambahkan",
          color: "red",
        });
      } finally {
      }
    },
    [email, name, onClose, phoneNumber]
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
              Tambah Customer
            </Text>
            <Separator _gap={24} />

            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              required
            />
            <Separator _gap={24} />
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Nama"
              required
            />
            <Separator _gap={24} />
            <TextField
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              label="Nomor Telepon"
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

export default CustomerForm;
