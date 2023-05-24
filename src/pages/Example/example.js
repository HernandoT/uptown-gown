import * as React from "react";
import { Button } from "./style";
import { getDocs } from "firebase/firestore";
import { customerIndex } from "../../repository/db";

const Example = () => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");

  React.useEffect(() => {
    const fetchCustomer = async () => {
      const rest = await getDocs(customerIndex);
      console.log(rest.docs.map((doc) => doc.data()));
    };

    fetchCustomer();
  }, []);

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
