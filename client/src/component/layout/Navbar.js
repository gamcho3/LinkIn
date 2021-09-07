import React from "react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLink = (
    <ul className={classes.list}>
      <li>
        <Link to="/addpost" className={classes.link}>
          Mypost
        </Link>
      </li>
      <li>
        <Link to="/profiles" className={classes.link}>
          USER
        </Link>
      </li>
      <li>
        <Link to="/dashboard" className={classes.link}>
          Dashboard
        </Link>
      </li>
      <li>
        <a href="#!" className={classes.link} onClick={logout}>
          LOGOUT
        </a>
      </li>
      <li>
        <Link to="/profile" className={classes.link}>
          <i className="fas fa-user-circle"></i>
        </Link>
      </li>
    </ul>
  );

  const guestLink = (
    <ul className={classes.list}>
      <li>
        <Link to="/register" className={classes.link}>
          <i className="fas fa-user-plus"></i>SIGNUP
        </Link>
      </li>
      <li>
        <Link to="/login" className={classes.link}>
          <i className="fas fa-sign-in-alt"></i>LOGIN
        </Link>
      </li>
    </ul>
  );

  return (
    <div className={classes.main}>
      <nav className={classes.navbar}>
        <h1 className={classes.title}>
          <Link to="/" className={classes.link}>
            MOVIE SHOP
          </Link>
        </h1>
        {isAuthenticated ? authLink : guestLink}
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
