import { SET_ALERT, REMOVE_ALERT } from "./type";

export const setAlert = (title, msg, status) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: { title, msg, status },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000);
};
