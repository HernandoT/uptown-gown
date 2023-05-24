import * as React from "react";
import { Button } from "./style";
import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../../services/customer";

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
      <input type="submit" />
      <Button>asdfasds</Button>
    </form>
  );
};

export default Example;
