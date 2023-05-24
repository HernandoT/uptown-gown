import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../../services/customer";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import * as React from "react";

const CustomerSelectInput = ({ onChange }) => {
  const [value, setValue] = React.useState(null);
  const [user, setUser] = React.useState();
  const { data: customerList } = useQuery(["get-customers"], () =>
    getCustomers()
  );

  const options = React.useMemo(
    () =>
      (customerList?.data || []).map((_data) => ({
        id: _data.id,
        label: [_data.nama, _data.nomor_telepon]
          .filter((val) => !!val)
          .join(" - "),
        extra: _data,
      })),
    [customerList]
  );

  const handleChange = React.useCallback((e) => {
    setValue(e.target.value);
  }, []);

  React.useEffect(() => {
    if (!!value) {
      const currentUser = options.find((option) => option.id === value);
      currentUser && setUser(currentUser);
    }
  }, [options, value]);

  console.log(options);

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-adornment-select">Customer</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Age"
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomerSelectInput;
