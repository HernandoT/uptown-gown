import "./PaginationItems.css";

const PaginationItems = ({ currentItems }) => {
  return (
    <div className="paginationItems">
      {currentItems &&
        currentItems.map((item) => (
          <div className="paginationItem">
            <h3>Item #{item}</h3>
          </div>
        ))}
    </div>
  );
};

export default PaginationItems;
