import React from "react";
import { Fragment } from "react";
import Navbar from "./Navbar";
import classes from "./Layout.module.css";
import Alert from "./Alert";
import { connect } from "react-redux";
const Layout = (props) => {
  const { showAlert } = props.alert;
  return (
    <Fragment>
      <Navbar />
      <main className={classes.main}>{props.children}</main>
      {showAlert && <Alert />}
    </Fragment>
  );
};

const mapStateProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateProps)(Layout);
