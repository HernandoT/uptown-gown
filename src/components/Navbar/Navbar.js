import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { getPages } from "../../utils/data/getPages";
import logo from "../../utils/assets/logo.png";

const Navbar = () => {
  const pages = getPages();
  const isLoged = localStorage.getItem("isLoged");

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
            <button
              onClick={() => {
                localStorage.setItem("isLoged", false);
                window.location.reload();
              }}
              style={{ float: "right" }}
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" style={{ float: "right" }}>
            Login
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
