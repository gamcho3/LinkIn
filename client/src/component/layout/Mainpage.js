import React from "react";
import classes from "./Mainpage.module.css";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
const Mainpage = ({ auth: { isAuthenticated } }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className={classes.main}>
      <section className={classes["landing"]}>
        <div className={classes["landing-inner"]}>
          <div className={classes["box"]}>
            <h1>MOVIE SHOP</h1>
            <p>this is movie shopping site. </p>
            <div>
              <Link
                to="/login"
                className={`${classes["link"]} ${classes["login"]}`}
              >
                LOGIN
              </Link>
              <Link
                to="/register"
                className={`${classes["link"]} ${classes["signup"]}`}
              >
                SIGN UP
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Mainpage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Mainpage);
