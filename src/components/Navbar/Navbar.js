import * as React from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { getPages } from "../../utils/data/getPages";
import logo from "../../utils/assets/logo.png";
import Divider from "@mui/material/Divider";

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

  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <>
      <div className={`navbar navbar-full ${navClass}`}>
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
              <i
                className="fa fa-sign-out fa-2x"
                onClick={() => {
                  localStorage.setItem("isLoged", false);
                  localStorage.setItem("email", "");
                  localStorage.setItem("idCustomer", "");
                  sessionStorage.setItem("items", JSON.stringify([]));
                  navigate("/");
                }}
                style={{ float: "right", marginRight: "5%", cursor:"pointer" }}
              ></i>
              <NavLink to="/profile" className={({ isActive }) => (isActive ? "linkActive" : "link")}>
                <div className="navbar-email">
                  {localStorage.getItem("email")}
                  <i className="fa fa-user-circle-o fa-2x" aria-hidden="true" style={{marginLeft: 16}}/>
                </div>
              </NavLink>
            </>
          ) : (
            <NavLink to="/login" className="login-button">
              LOGIN
            </NavLink>
          )}
        </nav>
      </div>
      <span className={`navbar-small`}>
        <div className={`navbar ${navClass}`}>
          <img src={logo} alt="logo" className="icon" />
          <nav className="nav"></nav>
          {isLoged === "true" ? (
              <>
              </>
            ) : (
              <>
              <NavLink to="/login" className="login-button">
                LOGIN
              </NavLink>
              </>
          )}
          <i
            className="fa fa-bars fa-2x"
            style={{ float:"right", marginRight: "5%", cursor:"pointer"}}
            onClick={()=>setShowMenu(!showMenu)}
          ></i>
        </div>
        {showMenu ? (
          <>
            <nav className="navbar-menu-small">
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
                <NavLink to="/profile" className={({ isActive }) => (isActive ? "linkActive" : "link")}>
                  {localStorage.getItem("email")}
                </NavLink>
                <NavLink 
                to="/" 
                className={({ isActive }) => (isActive ? "linkActive" : "link")}
                onClick={() => {
                  localStorage.setItem("isLoged", false);
                  localStorage.setItem("email", "");
                  localStorage.setItem("idCustomer", "");
                  sessionStorage.setItem("items", JSON.stringify([]));
                }}
                >
                  Log Out
                </NavLink>
              </>
              ) : (<></>)}
            </nav>
          </>
        ):(<></>)}
      </span>
    </>
  );
};

export default Navbar;
