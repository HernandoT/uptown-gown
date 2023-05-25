import { Flex, Paper, Text } from "@mantine/core";
import { Button, TextField } from "@mui/material";
import * as React from "react";
import Separator from "../../components/separator";
import { notifications } from "@mantine/notifications";

import { createCustomer, updateCustomer } from "../../services/customer";

const CustomerForm = ({
  data = { email: "", name: "", phoneNumber: "", password: "123456", id: "" },
  onClose,
  isEdit = false,
}) => {
  const [email, setEmail] = React.useState(data.email);
  const [name, setName] = React.useState(data.name);
  const [phoneNumber, setPhoneNumber] = React.useState(data.phoneNumber);

  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      try {
        isEdit
          ? updateCustomer(data.id, {
              email,
              nama: name,
              nomor_telepon: phoneNumber,
              password: data.password,
            })
          : createCustomer({
              email,
              nama: name,
              nomor_telepon: phoneNumber,
              password: data.password,
            });
        notifications.show({
          title: isEdit ? "Edit User" : "Tambah User",
          message: isEdit
            ? "Customer telah berhasil diupdate"
            : "Customer telah berhasil diedit",
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
    [data, email, isEdit, name, onClose, phoneNumber]
  );

  return (
    <Paper p={36} miw={400}>
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
  );
};

export default CustomerForm;
