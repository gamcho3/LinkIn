import { combineReducers } from "redux";
import auth from "./auth";
import alertReducer from "./alert";
export default combineReducers({ auth, alertReducer });
