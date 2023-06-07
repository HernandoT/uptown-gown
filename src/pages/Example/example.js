import * as React from "react";
import { Button } from "./style";
import CustomerSelectInput from "../../components/Select/customer-select-input";
import { Flex } from "@mantine/core";
import ColorSelectInput from "../../components/Select/color-select-input";
import TypeSelectInput from "../../components/Select/type-select-input";
import CategorySelectInput from "../../components/Select/category-select-input";
import * as Yup from "yup";
import useYupValidationResolver from "../../hooks/use-yup-resolver";
import Form from "../../components/field/form";
import { useForm } from "react-hook-form";
import TextInputField from "../../components/field/text-input";
import ImagesInputField from "../../components/field/image";
import DateInputField from "../../components/field/date-input";
import PasswordInputField from "../../components/field/password-input";
import RadioInputField from "../../components/field/radio-input";
import CheckboxField from "../../components/field/checkbox";
import SelectField from "../../components/field/select";
import NumberInputField from "../../components/field/number-input";

async function getFileFromUrl(url, name, defaultType = "image/jpeg") {
  const response = await fetch(url);
  const data = await response.blob();
  const file = new File([data], name, {
    type: "image/jpeg",
  });

  console.log(file);
  return file;
}

const Example = () => {
  const defaultValues = React.useMemo(
    () => ({ email: "", name: "", phone: "", file: [] }),
    []
  );
  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string().email().required(),
        name: Yup.string().required(),
        phoneNumber: Yup.string().required(),
      }),
    []
  );

  const resolver = useYupValidationResolver(yupSchema);

  const methods = useForm({
    defaultValues,
    resolver,
    mode: "onChange",
  });

  const onSubmit = React.useCallback(async (values) => {
    try {
      console.log(values);
    } catch (e) {
      console.log(e);
    } finally {
    }
  }, []);

  console.log(methods.formState.errors);

  return (
    <Form onSubmit={onSubmit} methods={methods}>
      <TextInputField name="name" label="name" placeholder="name" required />
      <PasswordInputField
        type="password"
        name="password"
        placeholder="password"
        required
      />
      <DateInputField name="date" type="range" placeholder="date" required />
      <NumberInputField
        isCurrency
        name="rupiah"
        placeholder="currency"
        required
      />
      <NumberInputField name="age" placeholder="age" required />
      <CheckboxField name="isGo" label="go" required />
      <RadioInputField
        name="gender"
        options={[
          { value: "male", label: "Pria" },
          { value: "female", label: "Wanita" },
        ]}
      />
      <SelectField
        name="gender"
        label="Gender"
        options={[
          { value: "male", label: "Pria" },
          { value: "female", label: "Wanita" },
        ]}
      />
      <ImagesInputField name="file" />
      <Flex>
        <CustomerSelectInput />
        <ColorSelectInput />
        <TypeSelectInput />
        <CategorySelectInput />
      </Flex>
      <input type="submit" />
      <Button>asdfasds</Button>
    </Form>
  );
};

export default Example;
