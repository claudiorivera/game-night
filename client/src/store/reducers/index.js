import { combineReducers } from "redux";
import user from "./user";
import error from "./error";

export default combineReducers({
  user,
  error,
});
