import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./CommentsForm.module.css";
import { addComment } from "../../actions/post";
import { connect } from "react-redux";
const CommentsForm = ({ postId, addComment }) => {
  const [formData, setFormData] = useState({
    password: "",
    text: "",
  });
  const [valid, setValid] = useState(true);
  const { password, text } = formData;

  const changeHandler = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
    if (text.length > 5) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    addComment(postId, formData);
    setFormData({
      password: "",
      text: "",
    });
  };

  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler}>
        <input
          type="password"
          placeholder="password"
          className={classes.password}
          onChange={changeHandler}
          id="password"
          maxLength="4"
          value={password}
        />
        <textarea
          placeholder="what are you thoughts?"
          className={classes.textarea}
          onChange={changeHandler}
          id="text"
          value={text}
        />
        <button className={classes.btn} type="submit" disabled={valid}>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

CommentsForm.propTypes = {
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentsForm);
