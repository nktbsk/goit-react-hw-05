import { NavLink } from "react-router-dom";
import style from "./Header.module.css";

const Header = () => {
  return (
    <header className={style.header}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/movies">Movies</NavLink>
    </header>
  );
};

export default Header;
