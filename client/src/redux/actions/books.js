import axios from "axios";
import M from "materialize-css";

import {
  GET_BOOKS,
  BOOKS_ERROR,
  ADD_BOOK,
  DELETE_BOOK,
  EDIT_BOOK,
  ADD_BOOK_IMAGE
} from "./types";

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
    type: BOOKS_ERROR,
    payload: {
      msg: error.response.statusText,
      status: error.response.status
    }
  });
};

//============================================

//! get all books
export const getBooks = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/books");
    dispatch({
      type: GET_BOOKS,
      payload: res.data
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};

//============================================

//! add book image
export const addBookImage = (_id, BookImage) => async (dispatch) => {
  try {
    let body = new FormData();
    body.append("photo", BookImage);
    const imageConfig = { "content-type": "multipart/form-data" };
    const res = await axios.post(
      `/adminBooks/addPhoto/${_id}`,
      body,
      imageConfig
    );
    dispatch({
      type: ADD_BOOK_IMAGE,
      payload: { _id, updatedBook: res.data }
    });
    M.toast({
      html: "Book photo Uploaded Successfully",
      classes: "alert bg-success text-white rounded"
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};

//============================================

//! add book
export const addBook = (bookData, bookImage) => async (dispatch) => {
  try {
    const res = await axios.post("/adminBooks/add", bookData, config);
    dispatch({ type: ADD_BOOK, payload: res.data });
    if (bookImage) {
      dispatch(addBookImage(res.data._id, bookImage));
    }
    M.toast({
      html: `Book "${res.data.name}" has been Added Successfully`,
      classes: "alert bg-success text-white rounded"
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};

//============================================

//! delete book
export const deleteBook = (_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/adminBooks/delete/${_id}`);
    dispatch({
      type: DELETE_BOOK,
      payload: _id
    });
    M.toast({
      html: res.data,
      classes: "alert bg-success text-white rounded"
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};

//============================================

//! edit book
export const editBook = (_id, bookData) => async (dispatch) => {
  // const { name, categoryId, authorId } = bookData;
  const body = JSON.stringify({
    name: bookData.name,
    category: bookData.categoryId,
    author: bookData.authorId
  });
  try {
    const res = await axios.patch(`/adminBooks/edit/${_id}`, body, config);
    dispatch({
      type: EDIT_BOOK,
      payload: { _id, updatedBook: res.data }
    });
    M.toast({
      html: "Book Updated Successfully",
      classes: "alert bg-success text-white rounded"
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};
