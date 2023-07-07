import * as React from "react";
import { Flex, Paper, Text } from "@mantine/core";
import Form from "../../components/field/form";
import Separator from "../../components/separator";
import TextInputField from "../../components/field/text-input";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";

const FittingForm = ({ onClose, fitting, onSubmitForm }) => {
  const defaultValues = React.useMemo(
    () => ({
      lingkarLeher: fitting?.lingkarLeher ?? "",
      panjangDada: fitting?.panjangDada ?? "",
      lenganPendek: fitting?.lenganPendek ?? "",
      lingkarBadan: fitting?.lingkarBadan ?? "",
      panjangPunggung: fitting?.panjangPunggung ?? "",
      lebarLengan: fitting?.lebarLengan ?? "",
      lingkarBadanAtas: fitting?.lingkarBadanAtas ?? "",
      panjangSisi: fitting?.panjangSisi ?? "",
      lenganPanjang: fitting?.lenganPanjang ?? "",
      lingkarPinggang: fitting?.lingkarPinggang ?? "",
      lebarBahu: fitting?.lebarBahu ?? "",
      lebarPergelanganLengan: fitting?.lebarPergelanganLengan ?? "",
      lingkarPerut: fitting?.lingkarPerut ?? "",
      lebarDada: fitting?.lebarDada ?? "",
      panjangSiku: fitting?.panjangSiku ?? "",
      lingkarPinggul: fitting?.lingkarPinggul ?? "",
      lebarPunggung: fitting?.lebarPunggung ?? "",
      panjangRok: fitting?.panjangRok ?? "",
      jarakDada: fitting?.jarakDada ?? "",
      tinggiPerut: fitting?.tinggiPerut ?? "",
      lebarKerungLengan: fitting?.lebarKerungLengan ?? "",
      tinggiDada: fitting?.tinggiDada ?? "",
      tinggiPinggul: fitting?.tinggiPinggul ?? "",
    }),
    [fitting]
  );

  const methods = useForm({
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = React.useCallback(
    (values) => {
      try {
        onSubmitForm(values);
        onClose();
      } catch (e) {
      } finally {
      }
    },
    [onClose, onSubmitForm]
  );

  return (
    <Paper p={36} miw={400}>
      <Form onSubmit={onSubmit} methods={methods}>
        <Flex direction="column">
          <Text fz={20} fw={600}>
            Fitting
          </Text>
          <Separator _gap={24} />
          <Flex direction="row" justify="space-between" gap="md">
            <TextInputField label="Lingkar Leher" name="lingkarLeher" />
            <TextInputField label="Panjang Dada" name="panjangDada" />
            <TextInputField label="Lengan Pendek" name="lenganPendek" />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between" gap="md">
            <TextInputField label="Lingkar Badan" name="lingkarBadan" />
            <TextInputField label="Panjang Punggung" name="panjangPunggung" />
            <TextInputField label="Lebar Lengan" name="lebarLengan" />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between" gap="md">
            <TextInputField
              label="Lingkar Badan Atas"
              name="lingkarBadanAtas"
            />
            <TextInputField label="Panjang Sisi" name="panjangSisi" />
            <TextInputField label="Lengan Panjang" name="lenganPanjang" />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between" gap="md">
            <TextInputField label="Lingkar Pinggang" name="lingkarPinggang" />
            <TextInputField label="Lebar Bahu" name="lebarBahu" />
            <TextInputField
              label="Lebar Pergelangan Lengan"
              name="lebarPergelanganLengan"
            />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between" gap="md">
            <TextInputField label="Lingkar Perut" name="lingkarPerut" />
            <TextInputField label="Lebar Dada" name="lebarDada" />
            <TextInputField label="Panjang Siku" name="panjangSiku" />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between" gap="md">
            <TextInputField label="Lingkar Pinggul" name="lingkarPinggul" />
            <TextInputField label="Lebar Punggung" name="lebarPunggung" />
            <TextInputField label="Panjang Rok" name="panjangRok" />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between" gap="md">
            <TextInputField label="Jarak Dada" name="jarakDada" />
            <TextInputField label="Tinggi Perut" name="tinggiPerut" />
            <TextInputField
              label="Lebar Kerung Lengan"
              name="lebarKerungLengan"
            />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between" gap="md">
            <TextInputField label="Tinggi Dada" name="tinggiDada" />
            <TextInputField label="Tinggi Pinggul" name="tinggiPinggul" />
            <TextInputField style={{visibility: "hidden"}} />
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
