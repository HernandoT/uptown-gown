import { Flex, Paper, Text } from "@mantine/core";
import { Button } from "@mui/material";
import * as React from "react";
import Separator from "../../components/separator";
import { notifications } from "@mantine/notifications";

import { createExpense, updateExpense } from "../../services/expense";
import { v4 } from "uuid";

import * as Yup from "yup";
import useYupValidationResolver from "../../hooks/use-yup-resolver";
import { useForm } from "react-hook-form";
import Form from "../../components/field/form";
import TextInputField from "../../components/field/text-input";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Timestamp } from "firebase/firestore";
import dayjs from "dayjs";
import DateInputField from "../../components/field/date-input";

const ExpenseForm = ({
  data = { keterangan: "", nominal: 0, tanggal: new Date(), id: "" },
  onClose,
  isEdit = false,
}) => {
  const defaultValues = React.useMemo(
    () => ({
      keterangan: data?.keterangan || "",
      nominal: data?.nominal || 0,
      tanggal: data?.tanggal || new Date(),
      id: v4(),
    }),
    [data]
  );

  const [date, setDate] = React.useState(defaultValues.tanggal);

  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        keterangan: Yup.string().required("Keterangan Wajib Diisi"),
        nominal: Yup.number().required().positive().integer().typeError("Nominal Wajib diisi dengan Angka"),
        tanggal: Yup.date().required(),
      }),
    []
  );

  const resolver = useYupValidationResolver(yupSchema);

  const methods = useForm({
    defaultValues,
    resolver,
    mode: "onChange",
  });

  const onSubmit = React.useCallback(
    async (values) => {
      try {
        isEdit
          ? updateExpense(data.id, {
              keterangan: values.keterangan,
              nominal: values.nominal,
              tanggal: Timestamp.fromDate(new Date(date)),
            })
          : createExpense({
              keterangan: values.keterangan,
              nominal: values.nominal,
              tanggal: Timestamp.fromDate(new Date(date)),
            });
        notifications.show({
          title: isEdit ? "Edit Pengeluaran" : "Tambah Pengeluaran",
          message: isEdit
            ? "Pengeluaran telah berhasil diupdate"
            : "Pengeluaran baru telah berhasil ditambahkan",
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
    [data.id, isEdit, onClose, date]
  );

  return (
    <Paper p={36} miw={400}>
      <Form onSubmit={onSubmit} methods={methods}>
        <Flex direction="column">
          <Text fz={20} fw={600}>
            {isEdit ? "Edit Expense" : "Tambah Expense"}
          </Text>
          <Separator _gap={24} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={dayjs(data.tanggal)} format="DD/MM/YYYY" onChange={(date) => setDate(date)}/>
          </LocalizationProvider>
          <Separator _gap={24} />
          <TextInputField
            label="Nominal"
            name="nominal"
            placeholder="Nominal"
          />
          <Separator _gap={24} />
          <TextInputField
            label="Keterangan"
            name="keterangan"
            placeholder="Keterangan"
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
      </Form>
    </Paper>
  );
};

export default ExpenseForm;
