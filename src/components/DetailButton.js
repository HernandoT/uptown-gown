const DetailButton = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        cursor: "pointer",
      }}
    >
      <i className="fa fa-pencil" aria-hidden="true"></i>
    </div>
  );
};

export default DetailButton;
