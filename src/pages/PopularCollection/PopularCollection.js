import "./PopularCollection.css";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const PopularCollection = () => {
  return (
    <div className="popular-collection">
      <div>Popular Collection</div>
      <div className="popular-collection-content">
        <div className="popular-collection-selector">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gambar 1</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Gambar 1"
              // onChange={handleChange}
            >
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gambar 2</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Gambar 2"
              // onChange={handleChange}
            >
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gambar 3</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Gambar 3"
              // onChange={handleChange}
            >
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gambar 4</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Gambar 4"
              // onChange={handleChange}
            >
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
            </Select>
          </FormControl>
          <button className="save-popular-collection">SIMPAN</button>
        </div>
        <div className="popular-collection-display">
          <div className="popular-collection-1">1</div>
          <div className="popular-collection-2">2</div>
          <div className="popular-collection-3">3</div>
          <div className="popular-collection-4">4</div>
        </div>
      </div>
    </div>
  );
};

export default PopularCollection;
