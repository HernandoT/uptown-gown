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
      lingkarLeher: fitting?.lingkar_leher ?? "",
      panjangDada: fitting?.panjang_dada ?? "",
      lenganPendek: fitting?.lengan_pendek ?? "",
      lingkarBadan: fitting?.lingkar_badan ?? "",
      panjangPunggung: fitting?.panjang_punggung ?? "",
      lebarLengan: fitting?.lebar_lengan ?? "",
      lingkarBadanAtas: fitting?.lingkar_badanAtas ?? "",
      panjangSisi: fitting?.panjang_sisi ?? "",
      lenganPanjang: fitting?.lengan_panjang ?? "",
      lingkarPinggang: fitting?.lingkar_pinggang ?? "",
      lebarBahu: fitting?.lebar_bahu ?? "",
      lebarPergelanganLengan: fitting?.lebar_pergelangan_lengan ?? "",
      lingkarPerut: fitting?.lingkar_perut ?? "",
      lebarDada: fitting?.lebar_dada ?? "",
      panjangSiku: fitting?.panjang_siku ?? "",
      lingkarPinggul: fitting?.lingkar_pinggul ?? "",
      lebarPunggung: fitting?.lebar_punggung ?? "",
      panjangRok: fitting?.panjang_rok ?? "",
      jarakDada: fitting?.jarak_dada ?? "",
      tinggiPerut: fitting?.tinggi_perut ?? "",
      lebarKerungLengan: fitting?.lebar_kerung_lengan ?? "",
      tinggiDada: fitting?.tinggi_dada ?? "",
      tinggiPinggul: fitting?.tinggi_pinggul ?? "",
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
            <TextInputField
              label="Lingkar Badan Atas"
              name="lingkarBadanAtas"
            />
            <TextInputField label="Panjang Sisi" name="panjangSisi" />
            <TextInputField label="Lengan Panjang" name="lenganPanjang" />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between">
            <TextInputField label="Lingkar Pinggang" name="lingkarPinggang" />
            <TextInputField label="Lebar Bahu" name="lebarBahu" />
            <TextInputField
              label="Lebar Pergelangan Lengan"
              name="lebarPergelanganLengan"
            />
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
            <TextInputField
              label="Lebar Kerung Lengan"
              name="lebarKerungLengan"
            />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between">
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
