import axios from "axios";
import M from "materialize-css";

import {
  GET_USER_BOOKS,
  ADD_BOOK_SHELVE,
  USER_BOOKS_ERROR
} from "../actions/types";

//============================================

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

const handleError = (error, dispatch) => {
  const errors = error.response.data.errors;
  if (errors) {
    errors.forEach((error) =>
      M.toast({
        html: error.msg,
        classes: "alert alert-danger rounded"
      })
    );
  }
  dispatch({
    type: USER_BOOKS_ERROR,
    payload: {
      msg: error.response.statusText,
      status: error.response.status
    }
  });
};

//============================================

//! get all user books
export const getUserBooks = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/users/bookshelves");
    dispatch({
      type: GET_USER_BOOKS,
      payload: res.data
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};

//============================================

//! add or update user book shelve
//! get user book after adding or updating shelve
export const addBookShelve = (shelve, _id, rating = null) => async (
  dispatch
) => {
  let body = JSON.stringify({ shelve, book: _id });
  if (rating === null) {
    body = JSON.stringify({ shelve, book: _id });
  } else {
    body = JSON.stringify({ shelve, book: _id, rating });
  }
  try {
    const res = await axios.post("/api/users/addBookShelve", body, config);
    // ======
    dispatch({
      type: ADD_BOOK_SHELVE,
      payload: { _id, updatedUserBook: res.data }
    });
    // ======
    if (!rating) dispatch(getUserBooks());
    // ======
  } catch (error) {
    handleError(error, dispatch);
  }
};

//! check matching book with user books to get shelve value
// export const checkMatchedBook = (_id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: CHECK_MATCHING_BOOK,
//       payload: _id
//     });
//   } catch (error) {
//     handleError(error, dispatch);
//   }
// };
