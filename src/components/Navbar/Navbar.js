import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { getPages } from "../../utils/data/getPages";
import logo from "../../utils/assets/logo.png";

const Navbar = () => {
  const pages = getPages();
  const isLoged = localStorage.getItem("isLoged");
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="icon" />
      <nav className="nav">
        {pages.map((page, i) => (
          <NavLink
            key={i}
            to={page.route}
            className={({ isActive }) => (isActive ? "linkActive" : "link")}
          >
            {page.name}
          </NavLink>
        ))}
        {isLoged === "true" ? (
          <>
            <NavLink
              to="/history"
              className={({ isActive }) => (isActive ? "linkActive" : "link")}
            >
              History
            </NavLink>
            <i
              className="fa fa-sign-out fa-2x"
              onClick={() => {
                localStorage.setItem("isLoged", false);
                localStorage.setItem("email", "");
                localStorage.setItem("idCustomer", "");
                navigate("/");
              }}
              style={{ float: "right" }}
            ></i>
            <NavLink to="/profile" className="profile-button">
              <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
            </NavLink>
          </>
        ) : (
          <NavLink to="/login" className="login-button">
            LOGIN
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
