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
import { getCollections } from "../../services/collection";

const Rent = () => {
  const isLoged = localStorage.getItem("isLoged");

  const { data, isFetching } = useQuery(["get-collections"], () =>
    getCollections()
  );

  const { data: colorList } = useQuery(["get-colors"], () => getColors());
  const { data: categoryList } = useQuery(["get-categories"], () =>
    getCategories()
  );
  const { data: typeList } = useQuery(["get-types"], () => getTypes());

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
      {isFetching ? (
        <></>
      ) : (
        <>
          <Navbar />
          <div className="rentContent">
            <div className="filter">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>
                  <b>Filters</b>
                </p>
                <p style={{ alignSelf: "flexEnd" }}>Clear All</p>
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
                  name="radio-buttons-group"
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
                  name="radio-buttons-group"
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
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <div style={{ marginTop: "0.5rem" }}>
                <button className="filterButton">FILTER</button>
              </div>
            </div>
            <div className="filterItems">
              <PaginatedItems itemsPerPage={8} data={data.data} />
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
