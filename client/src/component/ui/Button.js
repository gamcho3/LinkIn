import React from "react";
import classes from "./Button.module.css";
const Button = (props) => {
  const { type, name } = props;
  return (
    <button className={classes["btn"]} type={type}>
      {name}
    </button>
  );
};

export default Button;
