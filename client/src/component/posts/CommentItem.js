import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import classes from "./CommentItem.module.css";
import { deleteComment } from "../../actions/post";
import { connect } from "react-redux";
const CommentItem = ({ comment, postId, deleteComment, auth }) => {
  const { name, time, text, _id: id, user } = comment;

  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <h3>{name}</h3>
        <span>
          <Moment format="MM/DD">{time}</Moment>
        </span>
      </div>
      <div>
        <p>{text}</p>
      </div>
      <div className={classes["del-box"]}>
        {auth.user._id === user ? (
          <Fragment>
            <input type="password" maxLength="4" />
            <button onClick={() => deleteComment(postId, id)}>X</button>
          </Fragment>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
