export const validAction = (validator) => (dispatch) => {
  dispatch({
    type: "VALID",
    payload: validator,
  });
};
