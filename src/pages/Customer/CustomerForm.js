import { Flex, Modal, Paper } from "@mantine/core";
import { Button, TextField } from "@mui/material";
import * as React from "react";

export default function CustomerForm({
  data = { email: "", name: "", phoneNumber: "" },
  open = true,
  onClose,
}) {
  const [email, setEmail] = React.useState(data.email);
  const [name, setName] = React.useState(data.name);
  const [phoneNumber, setPhoneNumber] = React.useState(data.password);

  const onSubmit = React.useCallback(
    (e) => async () => {
      try {
        e.preventDefault();
        const data = {
          name,
          email,
          phoneNumber,
          password: 123456,
        };

        console.log(data);
      } catch {
      } finally {
      }
    },
    [email, name, phoneNumber]
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Paper>
        <form onSubmit={onSubmit}>
          <Flex>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="email"
            />
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="name"
            />
            <TextField
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              label="phone"
            />
            <Button variant="contained">Tambah Customer</Button>
          </Flex>
        </form>
      </Paper>
    </Modal>
  );
}
