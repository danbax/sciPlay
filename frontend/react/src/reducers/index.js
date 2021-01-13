import { combineReducers } from "redux";
import message from "./message";
import facts from "./facts";

export default combineReducers({
  message,
  facts
});
