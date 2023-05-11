import "./Navbar.css"
import { NavLink } from "react-router-dom";
import { getPages } from "../../utils/data/getPages";
import logo from "../../utils/assets/logo.png";

const Navbar = () => {
  const pages = getPages();

  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="icon"/>
      <nav className="nav">
        {pages.map((page, i) => (
          <NavLink
            key={i}
            to={page.route}
            className={({ isActive }) =>
              isActive ? "linkActive" : "link"
            }
          >
            {page.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
