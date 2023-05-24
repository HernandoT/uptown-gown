import { useQuery } from "@tanstack/react-query";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import * as React from "react";
import { getTypes } from "../../services/type";

const TypeSelectInput = ({ onChange }) => {
  const [value, setValue] = React.useState(null);
  const [type, setType] = React.useState();
  const { data: typeList } = useQuery(["get-types"], () => getTypes());

  const options = React.useMemo(
    () =>
      (typeList?.data || []).map((_data) => ({
        id: _data.id,
        label: _data.nama_jenis,
        extra: _data,
      })),
    [typeList]
  );

  const handleChange = React.useCallback((e) => {
    setValue(e.target.value);
  }, []);

  React.useEffect(() => {
    if (!!value) {
      const currentType = options.find((option) => option.id === value);
      currentType && setType(currentType);
    }
  }, [options, value]);

  console.log(type);
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-adornment-select">Jenis</InputLabel>
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

export default TypeSelectInput;
