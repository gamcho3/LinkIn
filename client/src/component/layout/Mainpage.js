import React, { Fragment } from "react";
import classes from "./Mainpage.module.css";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
const Mainpage = ({ auth: { isAuthenticated } }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <section className={classes["landing"]}>
        <div className={classes["landing-inner"]}>
          <div className={classes["box"]}>
            <h1>LinkIn</h1>
            <p>다양한 개발자들과 소통하세요 </p>
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
    </Fragment>
  );
};

Mainpage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Mainpage);
