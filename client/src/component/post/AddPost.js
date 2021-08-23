import React from "react";
import Input from "../ui/input";
import classes from "./AddPost.module.css";
const AddPost = () => {
  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <form>
          <div className={classes.box}>
            <Input type="text" id="title" />
          </div>
          <div className={classes.box}>
            <label htmlFor="description">description</label>
            <textarea
              id="description"
              rows="5"
              cols="33"
              placeholder="enter your comment"
            ></textarea>
          </div>
          <button>submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
