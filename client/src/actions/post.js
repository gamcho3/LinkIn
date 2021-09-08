import { ADD_POST, DELETE_POST, GET_POST, ERROR_POST } from "./type";
import api from "../utils/api";
import { setAlert } from "./alert";

//GET api/post
//get all post
export const getPost = () => (dispatch) => {
  try {
    const res = api.get("/post");
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {}
};

export const addPost = (formData) => (dispatch) => {
  try {
    const res = api.post("/post", formData);
    dispatch({
      type: ADD_POST,
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
