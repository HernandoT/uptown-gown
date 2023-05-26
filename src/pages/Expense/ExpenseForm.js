import { Flex, Paper, Text } from "@mantine/core";
import { Button, TextField } from "@mui/material";
import * as React from "react";
import Separator from "../../components/separator";
import { notifications } from "@mantine/notifications";
import { Timestamp } from "@firebase/firestore";

import { createExpense, updateExpense } from "../../services/expense";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const ExpenseForm = ({
  data = { date: "Test", nominal: 0, description: "Test" },
  onClose,
  isEdit = false,
}) => {
  const [date, setDate] = React.useState(data.date);
  const [nominal, setNominal] = React.useState(data.nominal);
  const [description, setDescription] = React.useState(data.description);
  console.log(data)

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
        console.log(date, nominal, description);
        notifications.show({
          title: isEdit ? "Edit Pengeluaran" : "Tambah Pengeluaran",
          message: isEdit
            ? "Pengeluaran telah berhasil diupdate"
            : "Pengeluaran baru telah berhasil ditambah",
          color: "teal",
        });
        onClose();
      } catch (err) {
        console.log(err);
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={date}
              onChange={(date) => setDate(Timestamp.fromDate(new Date(date)))}
              label="Tanggal"
              required
            />
          </LocalizationProvider>
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
