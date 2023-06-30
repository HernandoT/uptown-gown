import * as React from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { getPages } from "../../utils/data/getPages";
import logo from "../../utils/assets/logo.png";

const Navbar = () => {
  const pages = getPages();
  const isLoged = localStorage.getItem("isLoged");
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const navClass = scrollPosition > 0 ? "solid-nav" : "";

  React.useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${navClass}`}>
      <img src={logo} alt="logo" className="icon" />
      <nav className="nav">
        {pages.map((page, i) => (
          <NavLink
            key={i}
            to={page.route}
            className={({ isActive }) => (isActive ? "linkActive" : "link")}
            onClick={() => window.scrollTo(0, 0)}
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
              style={{ float: "right", marginRight: 50 }}
            ></i>
            <NavLink to="/profile" className="profile-button">
              <i className="fa fa-user-circle-o fa-2x" aria-hidden="true" />
            </NavLink>
            <span className="navbar-email">
              {localStorage.getItem("email")}
            </span>
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
