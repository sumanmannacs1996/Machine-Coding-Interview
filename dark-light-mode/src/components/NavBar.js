import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/themeContext";

function NavBar() {
  const { theme, togleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/blog">Blog</NavLink>
      </div>
      <div className="mode-switch">
        <label>
          <input
            type="checkbox"
            onChange={togleTheme}
            checked={theme === "dark"}
          />
          <span className="slider"></span>
        </label>
      </div>
    </nav>
  );
}

export default NavBar;
