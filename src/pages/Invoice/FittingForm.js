import * as React from "react";
import { Flex, Paper, Text } from "@mantine/core";
import Form from "../../components/field/form";
import Separator from "../../components/separator";
import TextInputField from "../../components/field/text-input";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";

const FittingForm = ({ onClose }) => {
  const onSubmit = React.useCallback(async (values) => {
    try {
      console.log(values);
    } catch (e) {
      console.log(e.messages);
    } finally {
    }
  });

  const methods = useForm({
    // defaultValues,
    // resolver,
    mode: "onChange",
  });

  return (
    <Paper p={36} miw={400}>
      <Form onSubmit={onSubmit} methods={methods}>
        <Flex direction="column">
          <Text fz={20} fw={600}>
            Fitting
          </Text>
          <Separator _gap={24} />
          <Flex direction="row" justify="space-between">
            <TextInputField label="Lingkar Leher" name="lingkarLeher" />
            <TextInputField label="Panjang Dada" name="panjangDada" />
            <TextInputField label="Lengan Pendek" name="lenganPendek" />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between">
            <TextInputField label="Lingkar Badan" name="lingkarBadan" />
            <TextInputField label="Panjang Punggung" name="panjangPunggung" />
            <TextInputField label="Lebar Lengan" name="lebarLengan" />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between">
            <TextInputField label="Lingkar Badan Atas" name="lingkarBadanAtas" />
            <TextInputField label="Panjang Sisi" name="panjangSisi" />
            <TextInputField label="Lengan Panjang" name="lenganPanjang" />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between">
            <TextInputField label="Lingkar Pinggang" name="lingkarPinggang" />
            <TextInputField label="Lebar Bahu" name="lebarBahu" />
            <TextInputField label="Lebar Pergelangan Lengan" name="lebarPergelanganLengan" />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between">
            <TextInputField label="Lingkar Perut" name="lingkarPerut" />
            <TextInputField label="Lebar Dada" name="lebarDada" />
            <TextInputField label="Panjang Siku" name="panjangSiku" />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between">
            <TextInputField label="Lingkar Pinggul" name="lingkarPinggul" />
            <TextInputField label="Lebar Punggung" name="lebarPunggung" />
            <TextInputField label="Panjang Rok" name="panjangRok" />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between">
            <TextInputField label="Jarak Dada" name="jarakDada" />
            <TextInputField label="Tinggi Perut" name="tinggiPerut" />
            <TextInputField label="Lebar Kerung Lengan" name="lebarKerungLengan" />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="flex-start">
            <TextInputField label="Tinggi Dada" name="tinggiDada" />
            <Separator _gap={14} />
            <TextInputField label="Tinggi Pinggul" name="tinggiPinggul" />
          </Flex>
          <Separator _gap={16} />
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

export default FittingForm;
