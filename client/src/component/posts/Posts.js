import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import Spinner from "../layout/Spinner";
import { Fragment } from "react";
import PostItem from "./PostItem";
import classes from "./Posts.module.css";
import PostForm from "./PostForm";
const Posts = ({ getPost, post: { posts, loading } }) => {
  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1>Posts</h1>
          <p>Welcome to the community</p>
          <span className={classes.title}>당신의 의견을 올려주세요</span>
          <PostForm />
          {posts.length > 0 && (
            <div className={classes.posts}>
              {posts.map((post) => (
                <PostItem post={post} key={post._id} />
              ))}
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Posts);
