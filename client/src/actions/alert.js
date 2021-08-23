import { SET_ALERT } from "./type";

export const setAlert = (msg, alertType) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType },
  });
};
