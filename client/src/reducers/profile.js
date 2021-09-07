import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  CREATE_PROFILE,
  GET_PROFILES,
} from "../actions/type";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

const profile = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_PROFILE:
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false };
    case GET_PROFILES:
      return { ...state, profiles: payload, loading: false };
    case PROFILE_ERROR:
      return { ...state, error: payload, loading: false };
    case CLEAR_PROFILE:
      return { ...state, profile: null, loading: false };
    default:
      return state;
  }
};

export default profile;
