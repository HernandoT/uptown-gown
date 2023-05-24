import "./Filters.css";
import AdminTitle from "../../components/AdminTitle/AdminTitle";
import { Chip, Stack } from "@mui/material";
import * as React from "react";
import { useDisclosure } from "@mantine/hooks";
import FilterColorForm from "./FilterColorForm";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

const Filters = () => {
  const [colors, setColors] = React.useState([]);
  const [opened, { open, close }] = useDisclosure(false);

  const fetchColors = async () => {
    await getDocs(collection(db, "warna")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setColors(newData);
    });
  };

  React.useEffect(() => {
    fetchColors();
  }, []);

  const categories = ["Cheongsam/Changsan", "Party", "Wedding"];
  const types = ["Pria", "Wanita"];

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <div className="filters">
      <AdminTitle props={"Filters"} />
      <div className="filters-content">
        <div style={{ margin: "20px 0 10px" }}>
          <b>Warna</b>
          <button style={{ marginLeft: "20px" }} onClick={open}>+</button>
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
        </div>
        <Stack direction="row" flexWrap="wrap">
          {categories.map((category) => {
            return (
              <Chip
                label={category}
                variant="outlined"
                onClick={handleClick}
                className="filters-chip"
              />
            );
          })}
        </Stack>
        <div style={{ margin: "20px 0 10px" }}>
          <b>Jenis</b>
        </div>
        <Stack direction="row" flexWrap="wrap">
          {types.map((type) => {
            return (
              <Chip
                label={type}
                variant="outlined"
                onClick={handleClick}
                className="filters-chip"
              />
            );
          })}
        </Stack>
      </div>
      <FilterColorForm onClose={close} open={opened} />
    </div>
  );
};

export default Filters;
