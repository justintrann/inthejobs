import React from "react";
import { NavLink } from "react-router-dom";
import links from "../utils/link";
const NaviLinks = (props) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        return (
          <NavLink
            to={link.path}
            key={link.id}
            onClick={props.toggleSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            end
          >
            <span className="icon">{link.icon}</span>
            {link.text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NaviLinks;
