import React, { Fragment, useEffect } from "react";
import PostItem from "./PostItem";
import { getPostById } from "../../actions/post";
import { useParams } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import CommentsForm from "./CommentsForm";
import classes from "./Post.module.css";
import CommentItem from "./CommentItem";
const Post = ({ getPostById, post: { post, loading } }) => {
  const params = useParams();
  const { id: postId } = params;
  useEffect(() => {
    getPostById(postId);
  }, [getPostById, postId]);

  return (
    <Fragment>
      {post === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className={classes.container}>
            <PostItem post={post} showAction={false} />
            <CommentsForm postId={postId} />
          </div>
          {post.comments.map((comment) => (
            <CommentItem comment={comment} key={comment._id} postId={postId} />
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

Post.propTypes = {
  getPostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getPostById })(Post);
