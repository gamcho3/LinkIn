import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  LOAD_USER,
  AUTH_ERROR,
} from "./type";
import api from "../utils/api";

export const login = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/auth/login", formData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => ({ type: LOGOUT });

export const register = (user) => async (dispatch) => {
  try {
    const res = await api.post("/users", user); //token값

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/auth");
    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
