import { combineReducers } from "redux";

import users from "./users";
import categories from "./categories";
import authors from "./authors";
import books from "./books";

export default combineReducers({
  users,
  categories,
  authors,
  books
});
