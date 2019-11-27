import { combineReducers } from "redux";

import users from "./users";
import alert from "./alert";

export default combineReducers({
  alert,
  users,
  Hello: () => "Hello"
});
