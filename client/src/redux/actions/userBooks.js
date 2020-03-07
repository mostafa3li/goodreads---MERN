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
export const addBookShelve = (shelve, bookData) => async (dispatch) => {
  // shelve, book, category, author
  const { bookId, category, author } = bookData;

  let body = JSON.stringify({ shelve, book: bookId, category, author });
  try {
    const res = await axios.post("/api/users/addBookShelve", body, config);
    // ======
    dispatch({
      type: ADD_BOOK_SHELVE,
      payload: { _id: bookId, updatedUserBook: res.data }
    });
    // ======
    dispatch(getUserBooks());
    // ======
  } catch (error) {
    handleError(error, dispatch);
  }
};

//============================================

//! add or update user book rating
export const addBookRating = (rating, bookId) => async (dispatch) => {
  // rating, book

  let body = JSON.stringify({ rating, book: bookId });
  try {
    const res = await axios.post("/api/users/addBookRating", body, config);
    // ======
    dispatch({
      type: ADD_BOOK_SHELVE,
      payload: { _id: bookId, updatedUserBook: res.data }
    });
    // ======
    dispatch(getUserBooks());
    // ======
  } catch (error) {
    handleError(error, dispatch);
  }
};
