import { combineReducers } from "redux";

import users from "./users";
import categories from "./categories";
import authors from "./authors";
import books from "./books";
import userBooks from "./userBooks";

export default combineReducers({
  users,
  categories,
  authors,
  books,
  userBooks
});
