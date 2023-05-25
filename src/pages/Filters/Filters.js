import "./Filters.css";
import AdminTitle from "../../components/AdminTitle/AdminTitle";
import { Chip, Modal, Stack } from "@mui/material";
import * as React from "react";
import { useDisclosure } from "@mantine/hooks";
import FilterColorForm from "./FilterColorForm";
import FilterTypeForm from "./FilterTypeForm";
import FilterCategoryForm from "./FilterCategoryForm";
import { useQuery } from "@tanstack/react-query";
import { getColors } from "../../services/color";
import { getCategories } from "../../services/category";
import { getTypes } from "../../services/type";

const defaultValueColor = { nama: "", kode: "" };
const defaultValueCategory = { nama: "" };
const defaultValueType = { name: "" };

const Filters = () => {
  const [openedColor, { open: openColor, close: closeColor }] =
    useDisclosure(false);
  const [openedCategory, { open: openCategory, close: closeCategory }] =
    useDisclosure(false);
  const [openedType, { open: openType, close: closeType }] =
    useDisclosure(false);

  const [currentColor, setCurrentColor] = React.useState(defaultValueColor);
  const [currentType, setCurrentType] = React.useState(defaultValueType);
  const [currentCategory, setCurrentCategory] =
    React.useState(defaultValueCategory);

  const { data: colorList } = useQuery(["get-colors"], () => getColors());
  const { data: categoryList } = useQuery(["get-categories"], () =>
    getCategories()
  );
  const { data: typeList } = useQuery(["get-types"], () => getTypes());

  const handleClick = React.useCallback(
    (type = "", data = "") =>
      () => {
        const isEmpty = typeof data === "string";
        switch (type) {
          case "color":
            isEmpty
              ? setCurrentColor(defaultValueColor)
              : setCurrentColor(data);
            openColor();
            break;
          case "type":
            isEmpty ? setCurrentType(defaultValueType) : setCurrentType(data);
            openType();
            break;
          case "category":
            isEmpty
              ? setCurrentCategory(defaultValueCategory)
              : setCurrentCategory(data);
            openCategory();
            break;
          default:
            break;
        }
      },
    [openCategory, openColor, openType]
  );

  return (
    <div className="filters">
      <AdminTitle props={"Filters"} />
      <div className="filters-content">
        <div style={{ margin: "20px 0 10px" }}>
          <b>Warna</b>
          <button
            style={{ marginLeft: "20px", width: "40px" }}
            onClick={openColor}
          >
            +
          </button>
        </div>
        <Stack direction="row" flexWrap="wrap">
          {(colorList?.data || []).map((color) => {
            const label = color.nama_warna + " " + color.kode_hex;
            return (
              <Chip
                label={label}
                variant="outlined"
                onClick={handleClick("color", color)}
                className="filters-chip"
              />
            );
          })}
        </Stack>
        <div style={{ margin: "20px 0 10px" }}>
          <b>Kategori</b>
          <button
            style={{ marginLeft: "20px", width: "40px" }}
            onClick={openCategory}
          >
            +
          </button>
        </div>
        <Stack direction="row" flexWrap="wrap">
          {(categoryList?.data || []).map((category) => {
            return (
              <Chip
                label={category.nama_kategori}
                variant="outlined"
                onClick={handleClick("category", category)}
                className="filters-chip"
              />
            );
          })}
        </Stack>
        <div style={{ margin: "20px 0 10px" }}>
          <b>Jenis</b>
          <button
            style={{ marginLeft: "20px", width: "40px" }}
            onClick={openType}
          >
            +
          </button>
        </div>
        <Stack direction="row" flexWrap="wrap">
          {(typeList?.data || []).map((type) => {
            return (
              <Chip
                label={type.nama_jenis}
                variant="outlined"
                onClick={handleClick("type", type)}
                className="filters-chip"
              />
            );
          })}
        </Stack>
      </div>
      <Modal open={openedColor}>
        <FilterColorForm
          data={currentColor}
          onClose={closeColor}
          open={openedColor}
        />
      </Modal>
      <Modal open={openedCategory}>
        <FilterCategoryForm
          data={currentCategory}
          onClose={closeCategory}
          open={openedCategory}
        />
      </Modal>
      <Modal open={openedType}>
        <FilterTypeForm
          data={currentType}
          onClose={closeType}
          open={openedType}
        />
      </Modal>
    </div>
  );
};

export default Filters;
