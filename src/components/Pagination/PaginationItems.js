import { useNavigate } from "react-router-dom";
import "./PaginationItems.css";

const PaginationItems = ({ currentItems }) => {
  const navigate = useNavigate();
  return (
    <div className="paginationItems">
      {currentItems &&
        currentItems.map((item) => (
          <div className="paginationItem" onClick={() => navigate(`/rent/${item.id}`)}>
            <img src={item.gambar} alt="Collection" className="imageItem"/>
            <div>{item.nama}</div>
          </div>
        ))}
    </div>
  );
};

export default PaginationItems;
