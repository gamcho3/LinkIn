import { SET_ALERT, REMOVE_ALERT } from "../actions/type";

const initialState = { showAlert: false, notification: {} };

const alert = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return { showAlert: true, notification: payload };
    case REMOVE_ALERT:
      return { showAlert: false, notification: null };
    default:
      return state;
  }
};

export default alert;
