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
      lingkar_leher: fitting?.lingkar_leher ?? "",
      panjang_dada: fitting?.panjang_dada ?? "",
      lengan_pendek: fitting?.lengan_pendek ?? "",
      lingkar_badan: fitting?.lingkar_badan ?? "",
      panjang_punggung: fitting?.panjang_punggung ?? "",
      lebar_lengan: fitting?.lebar_lengan ?? "",
      lingkar_badan_atas: fitting?.lingkar_badan_atas ?? "",
      panjang_sisi: fitting?.panjang_sisi ?? "",
      lengan_panjang: fitting?.lengan_panjang ?? "",
      lingkar_pinggang: fitting?.lingkar_pinggang ?? "",
      lebar_bahu: fitting?.lebar_bahu ?? "",
      lebar_pergelangan_lengan: fitting?.lebar_pergelanganlengan ?? "",
      lingkar_perut: fitting?.lingkar_perut ?? "",
      lebar_dada: fitting?.lebar_dada ?? "",
      panjang_siku: fitting?.panjang_siku ?? "",
      lingkar_pinggul: fitting?.lingkar_pinggul ?? "",
      lebar_punggung: fitting?.lebar_punggung ?? "",
      panjang_rok: fitting?.panjang_rok ?? "",
      jarak_dada: fitting?.jarak_dada ?? "",
      tinggi_perut: fitting?.tinggi_perut ?? "",
      lebarKerungLengan: fitting?.lebar_kerung_lengan ?? "",
      tinggi_dada: fitting?.tinggi_dada ?? "",
      tinggi_pinggul: fitting?.tinggi_pinggul ?? "",
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
            <TextInputField label="Lingkar Leher" name="lingkar_leher" />
            <TextInputField label="Panjang Dada" name="panjang_dada" />
            <TextInputField label="Lengan Pendek" name="lengan_pendek" />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between" gap="md">
            <TextInputField label="Lingkar Badan" name="lingkar_badan" />
            <TextInputField label="Panjang Punggung" name="panjang_punggung" />
            <TextInputField label="Lebar Lengan" name="lebar_lengan" />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between" gap="md">
            <TextInputField
              label="Lingkar Badan Atas"
              name="lingkar_badan_atas"
            />
            <TextInputField label="Panjang Sisi" name="panjang_sisi" />
            <TextInputField label="Lengan Panjang" name="lengan_panjang" />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between" gap="md">
            <TextInputField label="Lingkar Pinggang" name="lingkar_pinggang" />
            <TextInputField label="Lebar Bahu" name="lebar_bahu" />
            <TextInputField
              label="Lebar Pergelangan Lengan"
              name="lebar_pergelangan_lengan"
            />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between" gap="md">
            <TextInputField label="Lingkar Perut" name="lingkar_perut" />
            <TextInputField label="Lebar Dada" name="lebar_dada" />
            <TextInputField label="Panjang Siku" name="panjang_siku" />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between" gap="md">
            <TextInputField label="Lingkar Pinggul" name="lingkar_pinggul" />
            <TextInputField label="Lebar Punggung" name="lebar_punggung" />
            <TextInputField label="Panjang Rok" name="panjang_rok" />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between" gap="md">
            <TextInputField label="Jarak Dada" name="jarak_dada" />
            <TextInputField label="Tinggi Perut" name="tinggi_perut" />
            <TextInputField
              label="Lebar Kerung Lengan"
              name="lebarKerungLengan"
            />
          </Flex>
          <Separator _gap={16} />
          <Flex direction="row" justify="space-between" gap="md">
            <TextInputField label="Tinggi Dada" name="tinggi_dada" />
            <TextInputField label="Tinggi Pinggul" name="tinggi_pinggul" />
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
