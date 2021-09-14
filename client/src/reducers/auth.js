import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  //REGISTER_FAIL,
  LOGIN_FAIL,
  LOGOUT,
  LOAD_USER,
  AUTH_ERROR,
  ACCOUNT_DELETE,
} from "../actions/type";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: "",
  errors: [],
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case ACCOUNT_DELETE:
    case AUTH_ERROR:
    case LOGOUT:
    case LOGIN_FAIL:
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
