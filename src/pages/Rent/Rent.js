import "./Rent.css";
import Footer from "../../components/Footer/Footer";
import PaginatedItems from "../../components/Pagination/PaginatedItems";
import Navbar from "../../components/Navbar/Navbar";

const Rent = () => {
  return (
    <div className="rent">
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
          <div>
            <p>
              <b>Colors</b>
            </p>
            <div className="colorsContainer">
              {Array.from({ length: 10 }).map((item, index) => (
                <div className="colors" />
              ))}
            </div>
          </div>
          <hr />
          <p>
            <b>Category</b>
          </p>
          <div className="checkboxContainer">
            <label className="checkbox">
              <input type="checkbox" />
              <span style={{ marginLeft: "5px" }}>Label</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />
              <span style={{ marginLeft: "5px" }}>Label</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />
              <span style={{ marginLeft: "5px" }}>Label</span>
            </label>
          </div>
          <hr />
          <p>
            <b>Category</b>
          </p>
          <div className="checkboxContainer">
            <label className="checkbox">
              <input type="checkbox" />
              <span style={{ marginLeft: "5px" }}>Label</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />
              <span style={{ marginLeft: "5px" }}>Label</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />
              <span style={{ marginLeft: "5px" }}>Label</span>
            </label>
          </div>
        </div>
        <div className="filterItems">
          <PaginatedItems itemsPerPage={8} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Rent;
