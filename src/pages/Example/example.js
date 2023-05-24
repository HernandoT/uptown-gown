import * as React from "react";
import { Button } from "./style";
import CustomerSelectInput from "../../components/Select/customer-select-input";
import { Flex } from "@mantine/core";
import ColorSelectInput from "../../components/Select/color-select-input";
import TypeSelectInput from "../../components/Select/type-select-input";
import CategorySelectInput from "../../components/Select/category-select-input";

const Example = () => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const onSubmit = React.useCallback(
    (e) => async () => {
      try {
        e.preventDefault();
        const data = {
          name,
          email,
          phone,
          password: 123456,
        };

        console.log(data);
      } catch {
      } finally {
      }
    },
    [email, name, phone]
  );

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Flex>
        <CustomerSelectInput />
        <ColorSelectInput />
        <TypeSelectInput />
        <CategorySelectInput />
      </Flex>
      <input type="submit" />
      <Button>asdfasds</Button>
    </form>
  );
};

export default Example;
