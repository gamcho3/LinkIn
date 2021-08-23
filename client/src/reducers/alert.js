import { SET_ALERT, REMOVE_ALERT } from "../actions/type";

const initialState = {
  error: false,
};

const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return { error: true, ...payload };
    default:
      return state;
  }
};

export default alertReducer;
