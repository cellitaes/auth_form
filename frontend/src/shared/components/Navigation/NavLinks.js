import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/register" exact>
          REGISTER
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
