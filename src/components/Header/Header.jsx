import { NavLink } from "react-router-dom";
import style from "./Header.module.css";
import clsx from "clsx";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <NavLink
          className={({ isActive }) =>
            clsx(style.item, isActive && style.active)
          }
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            clsx(style.item, isActive && style.active)
          }
          to="/movies"
        >
          Movies
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
