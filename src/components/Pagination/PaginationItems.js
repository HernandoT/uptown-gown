import "./PaginationItems.css";

const PaginationItems = ({ currentItems }) => {
  return (
    <div className="paginationItems">
      {currentItems &&
        currentItems.map((item) => (
          <div className="paginationItem">
            <img src={item.gambar} alt="Collection" className="imageItem"/>
          </div>
        ))}
    </div>
  );
};

export default PaginationItems;
