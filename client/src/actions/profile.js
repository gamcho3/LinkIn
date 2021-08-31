import { CREATE_PROFILE, GET_PROFILE, PROFILE_ERROR } from "./type";
import api from "../utils/api";

//get current profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get("/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//get profile all
export const getProfile = () => async (dispatch) => {
  try {
    const res = await api.get("/profile");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

//crate profile
export const createProfile =
  (profile, history, edit = false) =>
  async (dispatch) => {
    try {
      const res = await api.post("/profile", profile);
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data,
      });
      if (!edit) {
        history.push("/dashboard");
      }
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
      });
    }
  };
