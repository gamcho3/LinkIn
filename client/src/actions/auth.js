import { LOGIN, REGISTER, REGISTER_FAIL } from "./type";
import api from "../utils/api";
export const login = (user) => (dispatch) => {
  dispatch({
    type: LOGIN,
    payload: user,
  });
};

export const register = (user) => async (dispatch) => {
  try {
    const res = await api.post("/users", user); //token값

    dispatch({
      type: REGISTER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.message,
    });
  }
};
