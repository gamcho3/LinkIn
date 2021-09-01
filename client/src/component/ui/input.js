import React from "react";
import classes from "./input.module.css";
import { connect } from "react-redux";

const Input = (props) => {
  const { id, type, value, onChange, name, min } = props;

  return (
    <div className={`${classes.control}`}>
      <label htmlFor={id}>{name}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        min={min}
      ></input>
      <p></p>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Input);
