import nothing from "../../utils/assets/nothing-filtered.jpg";
import "./Rent.css";
import * as React from "react";
import Footer from "../../components/Footer/Footer";
import PaginatedItems from "../../components/Pagination/PaginatedItems";
import Navbar from "../../components/Navbar/Navbar";
import SupportEngine from "../../SupportEngine";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { getColors } from "../../services/color";
import { getCategories } from "../../services/category";
import { getTypes } from "../../services/type";
import { useQuery } from "@tanstack/react-query";
import { getAvailableCollections } from "../../services/collection";

const Rent = () => {
  const [isInitiate, setIsInitiate] = React.useState(false);
  const [collections, setCollections] = React.useState(null);
  const [color, setColor] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [type, setType] = React.useState("");
  const [isFilter, setIsFilter] = React.useState(false);
  const isLoged = localStorage.getItem("isLoged");

  const { data, isFetching } = useQuery(["get-collections"], () =>
    getAvailableCollections()
  );

  const { data: colorList } = useQuery(["get-colors"], () => getColors());
  const { data: categoryList } = useQuery(["get-categories"], () =>
    getCategories()
  );
  const { data: typeList } = useQuery(["get-types"], () => getTypes());

  React.useEffect(() => {
    if (!isFetching) {
      setCollections(data.data);
      setIsInitiate(true);
    }
  }, [isFetching]);

  const handleSubmit = () => {
    let filteredCollections = data.data;
    if (color) {
      filteredCollections = filteredCollections.filter(
        (collection) => collection.id_warna === color
      );
    }
    if (category) {
      filteredCollections = filteredCollections.filter(
        (collection) => collection.id_kategori === category
      );
    }
    if (type) {
      filteredCollections = filteredCollections.filter(
        (collection) => collection.id_jenis === type
      );
    }

    setCollections(filteredCollections);
    setIsFilter(true);
  };

  const handleClear = () => {
    setColor("");
    setCategory("");
    setType("");
    setCollections(data.data);
    setIsFilter(false);
  };

  function StyledRadio(props) {
    return (
      <Radio
        disableRipple
        checkedIcon={<span className="styled-checkedIcon" />}
        icon={<span />}
        {...props}
      />
    );
  }

  return (
    <div className="rent">
      <Navbar />
      {!isInitiate ? (
        <></>
      ) : (
        <>
          <div className="rentContent">
            <div className="filter">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>
                  <b>Filters</b>
                </p>
                <p
                  style={{ alignSelf: "flexEnd", cursor: "pointer" }}
                  onClick={handleClear}
                >
                  Clear All
                </p>
              </div>
              <hr />
              <FormControl style={{ marginBottom: "0.5rem" }}>
                <FormLabel>
                  <p className="rent-filter-title">Warna</p>
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="radio-buttons-group-label"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginLeft: "0.5rem",
                  }}
                  name="color"
                  value={color}
                >
                  {(colorList?.data || []).map((color) => {
                    const kodehex = color.kode_hex;
                    return (
                      <FormControlLabel
                        value={color.id}
                        control={
                          <StyledRadio
                            className="radio-color"
                            sx={{
                              backgroundColor: kodehex,
                              width: "2.5rem",
                              height: "2.5rem",
                              outline: "grey solid 2px",
                              margin: "0.6rem",
                            }}
                          />
                        }
                        onClick={(e) => setColor(e.target.value)}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <hr />
              <FormControl style={{ marginBottom: "0.5rem" }}>
                <FormLabel>
                  <p className="rent-filter-title">Kategori</p>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="category"
                  value={category}
                >
                  {(categoryList?.data || []).map((category) => {
                    return (
                      <FormControlLabel
                        value={category.id}
                        control={<Radio />}
                        label={
                          <span className="rent-radio-label">
                            {category.nama_kategori}
                          </span>
                        }
                        onClick={(e) => setCategory(e.target.value)}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <hr />
              <FormControl>
                <FormLabel>
                  <p className="rent-filter-title">Jenis</p>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="type"
                  value={type}
                >
                  {(typeList?.data || []).map((type) => {
                    return (
                      <FormControlLabel
                        value={type.id}
                        control={<Radio />}
                        label={
                          <span className="rent-radio-label">
                            {type.nama_jenis}
                          </span>
                        }
                        onClick={(e) => setType(e.target.value)}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <div style={{ marginTop: "0.5rem" }}>
                <button className="filterButton" onClick={handleSubmit}>
                  FILTER
                </button>
              </div>
            </div>
            <div className="filterItems">
              {collections.length ? (
                <PaginatedItems
                  itemsPerPage={8}
                  data={collections}
                  isFilter={isFilter}
                  setIsFilter={setIsFilter}
                />
              ) : (
                <>
                  <img
                    src={nothing}
                    alt="Nothing Here"
                    style={{ width: "70%" }}
                  />
                  <p style={{ fontSize: "1.5rem" }}>
                    <b>Pencarian anda tidak ditemukan.</b>
                  </p>
                </>
              )}
            </div>
          </div>
          <Footer />
          {isLoged === "true" ? <SupportEngine /> : ""}
        </>
      )}
    </div>
  );
};

export default Rent;
