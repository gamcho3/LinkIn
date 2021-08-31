import React from "react";
import classes from "./Alert.module.css";
import { connect } from "react-redux";
const Alert = ({ alert }) => {
  const { notification } = alert;
  const { status, msg, title } = notification;

  let statusClasses;

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  const classCss = `${classes.box} ${statusClasses}`;

  return (
    <div className={classCss}>
      <h2>{title}</h2>
      <p>{msg}</p>
    </div>
  );
};

const mapStateProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateProps)(Alert);
