import React from "react";
import classes from "./input.module.css";
import { connect } from "react-redux";

const Input = (props) => {
  const { id, type, value, onChange, validators } = props;

  return (
    <div className={`${classes.control}`}>
      <label htmlFor={id}>{props.id}</label>
      <input type={type} id={id} value={value} onChange={onChange}></input>
      <p></p>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Input);
