import { VALID } from "../actions/type";

const initialState = {};
const validReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case VALID:
      return {
        ...payload,
      };
    default:
      return state;
  }
};

export default validReducer;
