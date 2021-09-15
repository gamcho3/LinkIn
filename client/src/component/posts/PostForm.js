import React, { useState } from "react";
import classes from "./Posts.module.css";
import { addPost } from "../../actions/post";
import { connect } from "react-redux";
const PostForm = ({ addPost }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [valid, setValid] = useState(true);

  const { title, description } = formData;

  const changeHandler = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));

    if (title.length > 3 && description.length > 3) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addPost(formData);
    setFormData({ title: "", description: "" });
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes["input-box"]}>
        <input
          className={classes.input}
          placeholder="title"
          id="title"
          onChange={changeHandler}
          value={title}
        />
        <textarea
          className={classes.textarea}
          placeholder="enter your opinion"
          id="description"
          onChange={changeHandler}
          value={description}
        />

        <button
          className={classes["submit-button"]}
          disabled={valid}
          type="submit"
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default connect(null, { addPost })(PostForm);
