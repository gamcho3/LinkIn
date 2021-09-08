import {
  CREATE_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
  CLEAR_PROFILE,
  ACCOUNT_DELETE,
} from "./type";
import api from "../utils/api";
import { setAlert } from "./alert";
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

//get profile by id
export const getProfileById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/user/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch(setAlert("error!", "error load user", "error"));
  }
};

//get profile all
export const getProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  try {
    const res = await api.get("/profile");
    dispatch({
      type: GET_PROFILES,
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
      dispatch(
        setAlert(
          "success!",
          edit ? "update completed" : "create completed",
          "success"
        )
      );
      if (!edit) {
        history.push("/dashboard");
      }
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) =>
          dispatch(setAlert("error!", error.msg, "error"))
        );
      }
      dispatch({
        type: PROFILE_ERROR,
      });
    }
  };

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const res = await api.put("/profile/experience", formData);

    dispatch({
      type: CREATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("success!", "create experience", "success"));

    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert("error!", error.msg, "error"))
      );
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/experience/${id}`);
    dispatch({
      type: CREATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("success!", "delete success", "success"));
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert("error!", error.msg, "error"))
      );
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

export const deleteAccount = () => async (dispatch) => {
  try {
    await api.delete("/profile");
    dispatch({
      type: ACCOUNT_DELETE,
    });
    dispatch({
      type: CLEAR_PROFILE,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};
