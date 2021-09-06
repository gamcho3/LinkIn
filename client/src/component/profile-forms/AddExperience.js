import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import classes from "./AddExperience.module.css";
import Button from "../ui/Button";
const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    from: "",
    to: "",
    current: false,
  });

  const { title, from, to, current } = formData;

  const changeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formHandler = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };

  return (
    <div className={classes.main}>
      <h1>Add an Experience</h1>
      <p>
        <i className="fas fa-code-branch" />
        Add any development
      </p>
      <small>* = required field</small>
      <form className={classes.form} onSubmit={formHandler}>
        <div className={classes["form-group"]}>
          <input
            type="text"
            name="title"
            onChange={changeHandler}
            value={title}
            placeholder="enter title"
          />
        </div>
        <div className={classes["form-group"]}>
          <input
            type="date"
            name="from"
            onChange={changeHandler}
            value={from}
          />
        </div>
        <div className={classes["form-group"]}>
          <input
            type="date"
            name="to"
            onChange={changeHandler}
            value={to}
            disabled={current}
          />
        </div>
        <div className={classes["form-group"]}>
          <input
            type="checkbox"
            name="current"
            onChange={() => {
              setFormData((prev) => ({ ...prev, current: !current }));
            }}
          />
          current job
        </div>
        <Button type="submit" name="CREATE" />
      </form>
    </div>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
