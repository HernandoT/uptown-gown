import { Flex, Paper, Text } from "@mantine/core";
import { Button, TextField } from "@mui/material";
import * as React from "react";
import Separator from "../../components/separator";
import { notifications } from "@mantine/notifications";
import { Timestamp } from "@firebase/firestore";

import { createExpense, updateExpense } from "../../services/expense";

const ExpenseForm = ({
  data = { date: Timestamp.now(), nominal: 0, description: "" },
  onClose,
  isEdit = false,
}) => {
  const [date, setDate] = React.useState(data.date);
  const [nominal, setNominal] = React.useState(data.nominal);
  const [description, setDescription] = React.useState(data.phoneNumber);

  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      try {
        isEdit
          ? updateExpense(data.id, {
              tanggal: date,
              nominal,
              keterangan: description,
            })
          : createExpense({
              tanggal: date,
              nominal,
              keterangan: description,
            });
        notifications.show({
          title: isEdit ? "Edit Pengeluaran" : "Tambah Pengeluaran",
          message: isEdit
            ? "Pengeluaran telah berhasil diupdate"
            : "Pengeluaran baru telah berhasil diedit",
          color: "teal",
        });
        onClose();
      } catch {
        notifications.show({
          title: "Tambah Pengeluaran",
          message: "Pengeluaran baru gagal ditambahkan",
          color: "red",
        });
      } finally {
      }
    },
    [isEdit, data.id, date, nominal, description, onClose]
  );

  return (
    <Paper p={36} miw={400}>
      <form onSubmit={onSubmit}>
        <Flex direction="column">
          <Text fz={20} fw={600}>
            Tambah Pengeluaran
          </Text>
          <Separator _gap={24} />

          <TextField
            value={date}
            onChange={(e) => setDate(e.target.value)}
            label="Tanggal"
            required
          />
          <Separator _gap={24} />
          <TextField
            value={nominal}
            onChange={(e) => setNominal(e.target.value)}
            label="Nominal"
            required
          />
          <Separator _gap={24} />
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Keterangan"
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

export default ExpenseForm;
