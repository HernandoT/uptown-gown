import { useQuery } from "@tanstack/react-query";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import * as React from "react";
import { getColors } from "../../services/color";

const ColorSelectInput = ({ onChange }) => {
  const [value, setValue] = React.useState(null);
  const [color, setColor] = React.useState();
  const { data: colorList } = useQuery(["get-color"], () => getColors());

  const options = React.useMemo(
    () =>
      (colorList?.data || []).map((_data) => ({
        id: _data.id,
        label: [_data.nama_warna, _data.kode_hex]
          .filter((val) => !!val)
          .join(" - "),
        extra: _data,
      })),
    [colorList]
  );

  const handleChange = React.useCallback((e) => {
    setValue(e.target.value);
  }, []);

  React.useEffect(() => {
    if (!!value) {
      const currentColor = options.find((option) => option.id === value);
      currentColor && setColor(currentColor);
    }
  }, [options, value]);

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-adornment-select">Warna</InputLabel>
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

export default ColorSelectInput;
