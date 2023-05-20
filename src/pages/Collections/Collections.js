import { useState } from "react";
import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./Collections.css";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Collections = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="collections">
      <AdminTitle props={"All Collections"} />
      <div className="collections-content">
        <div className="collections-search">
          <TextField
            id="search"
            type="search"
            label="Cari menurut nama"
            className="collections-search-input"
            value={searchTerm}
            onChange={handleChange}
            sx={{ width: "65%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <button className="collections-add">+ TAMBAH BARANG</button>
        </div>
      </div>
    </div>
  );
};

export default Collections;
