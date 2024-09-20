import React from "react";
import { NavLink } from "react-router-dom";

import s from "./Navigation.module.css";

export const Navigation = () => {
  const addActive = ({ isActive }) => (isActive ? s.active : s.link);
  return (
    <nav className={s.header}>
      <div className={s.home}>
        <NavLink className={addActive} to="/">
          Home
        </NavLink>
      </div>
      <div className={s.menu}>
        <NavLink className={addActive} to="/catalog">
          Catalog
        </NavLink>
        <NavLink className={addActive} to="/favorites">
          Favorites
        </NavLink>
      </div>
    </nav>
  );
};
