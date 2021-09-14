import {
  ADD_POST,
  DELETE_POST,
  GET_POST,
  ERROR_POST,
  UPDATE_LIKE,
  GET_POST_BYID,
  UPDATE_COMMENT,
  REMOVE_COMMENT,
} from "./type";
import api from "../utils/api";
import { setAlert } from "./alert";

//GET api/post
//get all post
export const getPost = () => async (dispatch) => {
  try {
    const res = await api.get("/post");
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR_POST,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getPostById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/post/${id}`);
    dispatch({
      type: GET_POST_BYID,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR_POST,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/post", formData);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert("success!", "Post success", "success"));
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR_POST,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await api.put(`/post/like/${postId}`);
    dispatch({
      type: UPDATE_LIKE,
      payload: { id: postId, likes: res.data },
    });
  } catch (error) {
    const errors = error.response.data.msg;
    if (errors) {
      dispatch(setAlert("error!", `${errors}`, "error"));
    }
    dispatch({
      type: ERROR_POST,
    });
  }
};

export const deleteLike = (postId) => async (dispatch) => {
  try {
    const res = await api.put(`/post/unlike/${postId}`);
    dispatch({
      type: UPDATE_LIKE,
      payload: { id: postId, likes: res.data },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR_POST,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await api.delete(`/post/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
    dispatch(getPost());
    dispatch(setAlert("success!", `${res.data.msg}`, "success"));
  } catch (error) {
    const errors = error.response.data.msg;
    if (errors) {
      dispatch(setAlert("error!", `${errors}`, "error"));
    }
  }
};

export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/post/comment/${postId}`, formData);
    dispatch({
      type: UPDATE_COMMENT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/post/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("success", "remove sccess!", "success"));
  } catch (error) {
    console.log(error.message);
  }
};
