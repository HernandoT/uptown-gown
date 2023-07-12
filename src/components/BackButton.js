import { useNavigate } from "react-router-dom";

const BackButton = ({ title = "Kembali" }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(-1)} style={{ cursor: "pointer", width:"fit-content" }}>
      <i
        className="fa fa-chevron-left"
        aria-hidden="true"
        style={{ margin: "16px" }}
      ></i>
      {title}
    </div>
  );
};

export default BackButton;
