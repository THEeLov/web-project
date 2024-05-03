import "./navigation.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="nav-container">
      <NavLink to="/users">
        {({ isActive }) => (
          <li
            className={
              isActive
                ? "nav-button nav-button--users active"
                : "nav-button nav-button--users"
            }
          >
            USERS
          </li>
        )}
      </NavLink>
      <NavLink to="/animals">
        {({ isActive }) => (
          <li
            className={
              isActive
                ? "nav-button nav-button--animals active"
                : "nav-button nav-button--animals"
            }
          >
            ANIMALS
          </li>
        )}
      </NavLink>
    </nav>
  );
};

export default Navigation;
