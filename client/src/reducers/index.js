import { combineReducers } from "redux";

import users from "./users";
import alert from "./alert";
import categories from "./categories";

export default combineReducers({
  users,
  categories,
  alert
});
