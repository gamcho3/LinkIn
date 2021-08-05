import React, { Fragment } from "react";

const Input = (props) => {
  const { id, type, value, onChange } = props;
  return (
    <div>
      <label htmlFor={id}>{props.id}</label>
      <input type={type} id={id} value={value} onChange={onChange}></input>
    </div>
  );
};

export default Input;
