import { LOGIN, REGISTER, REGISTER_FAIL } from "../actions/type";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: "",
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default auth;
