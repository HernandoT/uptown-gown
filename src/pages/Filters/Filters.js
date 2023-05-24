import "./Filters.css";
import AdminTitle from "../../components/AdminTitle/AdminTitle";
import { Chip, Stack } from "@mui/material";
import * as React from "react";
import { useDisclosure } from "@mantine/hooks";
import FilterColorForm from "./FilterColorForm";
import FilterTypeForm from "./FilterTypeForm";
import FilterCategoryForm from "./FilterCategoryForm";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

const Filters = () => {
  const [colors, setColors] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [types, setTypes] = React.useState([]);
  const [openedColor, { open: openColor, close: closeColor }] = useDisclosure(false);
  const [openedCategory, { open: openCategory, close: closeCategory }] = useDisclosure(false);
  const [openedType, { open: openType, close: closeType }] = useDisclosure(false);

  const fetchColors = async () => {
    await getDocs(collection(db, "warna")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setColors(newData);
    });
  };

  const fetchCategories = async () => {
    await getDocs(collection(db, "kategori")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCategories(newData);
    });
  };

  const fetchTypes = async () => {
    await getDocs(collection(db, "jenis")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTypes(newData);
    });
  };

  React.useEffect(() => {
    fetchColors();
    fetchCategories();
    fetchTypes();
  }, []);

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <div className="filters">
      <AdminTitle props={"Filters"} />
      <div className="filters-content">
        <div style={{ margin: "20px 0 10px" }}>
          <b>Warna</b>
          <button style={{ marginLeft: "20px", width: "40px" }} onClick={openColor}>
            +
          </button>
        </div>
        <Stack direction="row" flexWrap="wrap">
          {colors.map((color) => {
            const label = color.nama_warna + " " + color.kode_hex;
            return (
              <Chip
                label={label}
                variant="outlined"
                onClick={handleClick}
                className="filters-chip"
              />
            );
          })}
        </Stack>
        <div style={{ margin: "20px 0 10px" }}>
          <b>Kategori</b>
          <button style={{ marginLeft: "20px", width: "40px" }} onClick={openCategory}>+</button>
        </div>
        <Stack direction="row" flexWrap="wrap">
          {categories.map((category) => {
            return (
              <Chip
                label={category.nama_kategori}
                variant="outlined"
                onClick={handleClick}
                className="filters-chip"
              />
            );
          })}
        </Stack>
        <div style={{ margin: "20px 0 10px" }}>
          <b>Jenis</b>
          <button style={{ marginLeft: "20px", width: "40px" }} onClick={openType}>+</button>
        </div>
        <Stack direction="row" flexWrap="wrap">
          {types.map((type) => {
            return (
              <Chip
                label={type.nama_jenis}
                variant="outlined"
                onClick={handleClick}
                className="filters-chip"
              />
            );
          })}
        </Stack>
      </div>
      <FilterColorForm onClose={closeColor} open={openedColor} />
      <FilterCategoryForm onClose={closeCategory} open={openedCategory} />
      <FilterTypeForm onClose={closeType} open={openedType} />
    </div>
  );
};

export default Filters;
