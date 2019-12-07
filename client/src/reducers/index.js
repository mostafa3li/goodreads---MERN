import { combineReducers } from "redux";

import users from "./users";
import alert from "./alert";
import categories from "./categories";
import authors from "./authors";

export default combineReducers({
  users,
  categories,
  authors,
  alert
});
