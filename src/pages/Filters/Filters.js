import "./Filters.css";
import AdminTitle from "../../components/AdminTitle/AdminTitle";
import { Chip, Stack } from "@mui/material";
import { Modal } from "@mantine/core";
import * as React from "react";
import { useDisclosure } from "@mantine/hooks";
import FilterColorForm from "./FilterColorForm";
import FilterTypeForm from "./FilterTypeForm";
import FilterCategoryForm from "./FilterCategoryForm";
import { useQuery } from "@tanstack/react-query";
import { getColors } from "../../services/color";
import { getCategories } from "../../services/category";
import { getTypes } from "../../services/type";
import Separator from "../../components/separator";
import { getSizes } from "../../services/size";
import FilterSizeForm from "./FilterSizeForm";

const defaultValueColor = { nama_warna: "", kode_hex: "" };
const defaultValueCategory = { nama: "" };
const defaultValueType = { name: "" };
const defaultValueSize = { nama_ukuran: "" };

const Filters = () => {
  const [openedColor, { open: openColor, close: closeColor }] =
    useDisclosure(false);
  const [openedCategory, { open: openCategory, close: closeCategory }] =
    useDisclosure(false);
  const [openedType, { open: openType, close: closeType }] =
    useDisclosure(false);
  const [openedSize, { open: openSize, close: closeSize }] =
    useDisclosure(false);

  const [currentColor, setCurrentColor] = React.useState(defaultValueColor);
  const [currentType, setCurrentType] = React.useState(defaultValueType);
  const [currentCategory, setCurrentCategory] =
    React.useState(defaultValueCategory);
  const [currentSize, setCurrentSize] = React.useState(defaultValueSize);
  const [isEdit, setIsEdit] = React.useState(false);

  const { data: colorList } = useQuery(["get-colors"], () => getColors());
  const { data: categoryList } = useQuery(["get-categories"], () =>
    getCategories()
  );
  const { data: typeList } = useQuery(["get-types"], () => getTypes());
  const { data: sizeList } = useQuery(["get-sizes"], () => getSizes());

  const onClickAddColor = React.useCallback(() => {
    setCurrentColor(defaultValueColor);
    setIsEdit(false);
    openColor();
  }, [openColor]);

  const onClickAddCategory = React.useCallback(() => {
    setCurrentCategory(defaultValueCategory);
    setIsEdit(false);
    openCategory();
  }, [openCategory]);

  const onClickAddType = React.useCallback(() => {
    setCurrentType(defaultValueType);
    setIsEdit(false);
    openType();
  }, [openType]);

  const onClickAddSize = React.useCallback(() => {
    setCurrentSize(defaultValueSize);
    setIsEdit(false);
    openSize();
  }, [openSize]);

  const onClickEditColor = (color) => {
    setCurrentColor({
      nama_warna: color.nama_warna,
      kode_hex: color.kode_hex,
      id: color.id,
    });
    openColor();
    setIsEdit(true);
  };

  const onClickEditCategory = (category) => {
    setCurrentCategory({
      nama_kategori: category.nama_kategori,
      id: category.id,
    });
    openCategory();
    setIsEdit(true);
  };

  const onClickEditType = (type) => {
    setCurrentType({
      nama_jenis: type.nama_jenis,
      id: type.id,
    });
    openType();
    setIsEdit(true);
  };

  const onClickEditSize = (size) => {
    setCurrentSize({
      nama_ukuran: size.nama_ukuran,
      id: size.id,
    });
    openSize();
    setIsEdit(true);
  };

  return (
    <div className="filters-container">
      <div className="filters">
        <AdminTitle props={"Filters"} />
        <div className="filters-content">
          <div className="card-container">
            <div className="filters-head">
              <b>W A R N A</b>
              <button className="filters-button" onClick={onClickAddColor}>
                +
              </button>
            </div>
            <Stack direction="row" flexWrap="wrap">
              {(colorList?.data || []).map((color) => {
                const label = (
                  <>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {color.nama_warna}
                      <span
                        style={{
                          width: "15px",
                          height: "15px",
                          borderRadius: "50%",
                          backgroundColor: color.kode_hex,
                          border: "1px solid black",
                          marginLeft: "8px",
                        }}
                      ></span>
                    </div>
                  </>
                );
                // color.nama_warna + " " + color.kode_hex;
                return (
                  <Chip
                    label={label}
                    variant="outlined"
                    onClick={() => onClickEditColor(color)}
                    className="filters-chip"
                  />
                );
              })}
            </Stack>
            {/* <Stack direction="row" flexWrap="wrap">
            {(colorList?.data || []).map((color) => {
              const label = color.nama_warna + " " + color.kode_hex;
              return (
                <Chip
                  label={label}
                  variant="outlined"
                  onClick={() => onClickEditColor(color)}
                  className="filters-chip"
                />
              );
            })}
          </Stack> */}
          </div>
          <Separator _gap={36} />
          <div className="card-container">
            <div className="filters-head">
              <b>K A T E G O R I</b>
              <button className="filters-button" onClick={onClickAddCategory}>
                +
              </button>
            </div>
            <Stack direction="row" flexWrap="wrap">
              {(categoryList?.data || []).map((category) => {
                return (
                  <Chip
                    label={category.nama_kategori}
                    variant="outlined"
                    onClick={() => onClickEditCategory(category)}
                    className="filters-chip"
                  />
                );
              })}
            </Stack>
          </div>
          <Separator _gap={36} />
          <div className="card-container">
            <div className="filters-head">
              <b>J E N I S</b>
              <button className="filters-button" onClick={onClickAddType}>
                +
              </button>
            </div>
            <Stack direction="row" flexWrap="wrap">
              {(typeList?.data || []).map((type) => {
                return (
                  <Chip
                    label={type.nama_jenis}
                    variant="outlined"
                    onClick={() => onClickEditType(type)}
                    className="filters-chip"
                  />
                );
              })}
            </Stack>
          </div>
          <Separator _gap={36} />
          <div className="card-container">
            <div className="filters-head">
              <b>U K U R A N</b>
              <button className="filters-button" onClick={onClickAddSize}>
                +
              </button>
            </div>
            <Stack direction="row" flexWrap="wrap">
              {(sizeList?.data || []).map((size) => {
                return (
                  <Chip
                    label={size.nama_ukuran}
                    variant="outlined"
                    onClick={() => onClickEditSize(size)}
                    className="filters-chip"
                  />
                );
              })}
            </Stack>
          </div>
        </div>
      </div>
      <Modal
        opened={openedColor}
        centered
        onClose={closeColor}
        withCloseButton={false}
      >
        <FilterColorForm
          data={currentColor}
          onClose={closeColor}
          isEdit={isEdit}
        />
      </Modal>
      <Modal
        opened={openedCategory}
        centered
        onClose={closeCategory}
        withCloseButton={false}
      >
        <FilterCategoryForm
          data={currentCategory}
          onClose={closeCategory}
          isEdit={isEdit}
        />
      </Modal>
      <Modal
        opened={openedType}
        centered
        onClose={closeType}
        withCloseButton={false}
      >
        <FilterTypeForm
          data={currentType}
          onClose={closeType}
          isEdit={isEdit}
        />
      </Modal>
      <Modal
        opened={openedSize}
        centered
        onClose={closeSize}
        withCloseButton={false}
      >
        <FilterSizeForm
          data={currentSize}
          onClose={closeSize}
          isEdit={isEdit}
        />
      </Modal>
    </div>
  );
};

export default Filters;
