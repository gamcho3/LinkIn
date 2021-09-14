import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import Moment from "react-moment";
import classes from "./PostItem.module.css";
import { addLike, deleteLike, deletePost } from "../../actions/post";
const PostItem = ({
  post: { title, description, time, user, likes, comments, _id: id },
  auth,
  addLike,
  deleteLike,
  deletePost,
  showAction,
}) => {
  return (
    <div className={classes.post}>
      <div className={classes.title}>
        <Link className={classes.link} to={`/post/${id}`}>
          <h4>{title}</h4>
        </Link>
        <p>
          by <Moment format="YYYY/MM/DD">{time}</Moment>
        </p>
      </div>
      <div className={classes.description}>
        <p>{description}</p>
      </div>
      {showAction && (
        <Fragment>
          <button className={classes.like} onClick={() => addLike(id)}>
            <i className="fas fa-thumbs-up" />
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button className={classes.dislike} onClick={() => deleteLike(id)}>
            <i className="fas fa-thumbs-down" />
          </button>

          <Link className={classes.discuss} to={`/post/${id}`}>
            discuss{<span className={classes.icon}>{comments.length}</span>}
          </Link>

          {auth.user._id === user && (
            <button className={classes.remove} onClick={() => deletePost(id)}>
              <i className="fas fa-times" />
            </button>
          )}
        </Fragment>
      )}
    </div>
  );
};

PostItem.defaultProps = {
  showAction: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showAction: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, deleteLike, deletePost })(
  PostItem
);
