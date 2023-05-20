import "./Filters.css";
import AdminTitle from "../../components/AdminTitle/AdminTitle";
import { Chip, Stack } from "@mui/material";

const Filters = () => {
  const colors = [
    { nama: "White", kode: "#FFFFFF" },
    { nama: "Beige", kode: "#F5F5DC" },
    { nama: "Gold", kode: "#DEBA5C" },
    { nama: "Pink", kode: "#FFC0CB" },
    { nama: "Red", kode: "#E24040" },
    { nama: "Black", kode: "#000000" },
    { nama: "Grey", kode: "#C0C0C0" },
    { nama: "Purple", kode: "#B9A9E8" },
    { nama: "Blue", kode: "#9FE6F0" },
    { nama: "Green", kode: "#267355" },
  ];

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
        </div>
        <Stack direction="row" flexWrap="wrap">
          {colors.map((color) => {
            const label = color.nama + " " + color.kode;
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
    </div>
  );
};

export default Filters;
