import { useQuery } from "@tanstack/react-query";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import * as React from "react";
import { getTypes } from "../../services/type";
import { getCategories } from "../../services/category";

const CategorySelectInput = ({ onChange }) => {
  const [value, setValue] = React.useState(null);
  const [category, setCategory] = React.useState();
  const { data: categoryList } = useQuery(["get-categories"], () =>
    getCategories()
  );

  const options = React.useMemo(
    () =>
      (categoryList?.data || []).map((_data) => ({
        id: _data.id,
        label: _data.nama_kategori,
        extra: _data,
      })),
    [categoryList]
  );

  const handleChange = React.useCallback((e) => {
    setValue(e.target.value);
  }, []);

  React.useEffect(() => {
    if (!!value) {
      const currentCategory = options.find((option) => option.id === value);
      currentCategory && setCategory(currentCategory);
    }
  }, [options, value]);

  console.log(category);
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-adornment-select">Kategori</InputLabel>
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

export default CategorySelectInput;
