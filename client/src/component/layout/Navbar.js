import React from "react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <nav className={classes.navbar}>
        <h1 className={classes.title}>connector</h1>
        <ul className={classes.list}>
          <li>
            <Link to="/register" className={classes.link}>
              register
            </Link>
          </li>
          <Link to="/login" className={classes.link}>
            login
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
