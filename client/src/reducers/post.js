import { ADD_POST, GET_POST, DELETE_POST, ERROR_POST } from "../actions/type";

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {},
};

const post = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_POST:
      return { ...state, post: payload, loading: false };
    case GET_POST:
      return { ...state, posts: payload, loading: false };
    case DELETE_POST:
      return { ...state, post: payload, loading: false };
    case ERROR_POST:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};

export default post;
