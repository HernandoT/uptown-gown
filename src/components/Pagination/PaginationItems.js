import { useNavigate } from "react-router-dom";
import "./PaginationItems.css";

const PaginationItems = ({ currentItems }) => {
  const navigate = useNavigate();
  return (
    <div className="paginationItems">
      {currentItems &&
        currentItems.map((item) => (
          <div className="paginationItem" onClick={() => navigate(`/rent/${item.id}`)}>
            <div className="imageItem-container">
              <img src={item.gambar} alt="Collection" className="imageItem"/>
            </div>
            <div className="detailItem">
              <div>{item.nama}</div>
              <div style={{color: "#c69738", fontWeight:"600"}}>Rp. -Harga-</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PaginationItems;
