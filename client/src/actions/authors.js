import axios from "axios";
import M from "materialize-css";

import {
  GET_AUTHORS,
  AUTHORS_ERROR,
  ADD_AUTHOR,
  DELETE_AUTHOR,
  EDIT_AUTHOR,
  ADD_AUTHOR_IMAGE,
  DELETE_RELATED_BOOKS
} from "./types";

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
    type: AUTHORS_ERROR,
    payload: {
      msg: error.response.statusText,
      status: error.response.status
    }
  });
};

//! get all authors
export const getAuthors = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/authors");
    dispatch({
      type: GET_AUTHORS,
      payload: res.data
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};

//! add author image
export const addAuthorImage = (_id, authorImage) => async (dispatch) => {
  try {
    let body = new FormData();
    body.append("avatar", authorImage);
    const imageConfig = { "content-type": "multipart/form-data" };
    const res = await axios.post(
      `/adminAuthors/addAvatar/${_id}`,
      body,
      imageConfig
    );
    dispatch({
      type: ADD_AUTHOR_IMAGE,
      payload: { _id, updatedAuthor: res.data }
    });
    M.toast({
      html: "Author photo Uploaded Successfully",
      classes: "alert bg-success text-white rounded"
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};

//! add Author
export const addAuthor = (authorData, authorImage) => async (dispatch) => {
  const { fName, lName, birthDate } = authorData;
  const name = `${fName} ${lName}`.trim();
  try {
    const res = await axios.post(
      "/adminAuthors/add",
      { name, birthDate },
      config
    );
    dispatch({
      type: ADD_AUTHOR,
      payload: res.data
    });

    if (authorImage) {
      dispatch(addAuthorImage(res.data._id, authorImage));
    }

    M.toast({
      html: `Author "${res.data.name}" has been added Successfully`,
      classes: "alert bg-success rounded text-white"
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};

//! delete author
export const deleteAuthor = (_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/adminAuthors/delete/${_id}`);
    dispatch({
      type: DELETE_AUTHOR,
      payload: _id
    });
    dispatch({
      type: DELETE_RELATED_BOOKS,
      payload: { relation: "author", _id }
    });
    M.toast({
      html: res.data,
      classes: "alert bg-success text-white rounded"
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};

//! edit author
export const editAuthor = (_id, authorData) => async (dispatch) => {
  const { fName, lName, birthDate } = authorData;
  const name = `${fName} ${lName}`;
  const body = JSON.stringify({ name, birthDate });

  try {
    const res = await axios.patch(`/adminAuthors/edit/${_id}`, body, config);
    console.log("response", res.data);
    dispatch({
      type: EDIT_AUTHOR,
      payload: { _id, updatedAuthor: res.data }
    });
    M.toast({
      html: "Category Updated Successfully",
      classes: "alert bg-success text-white rounded"
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};

// //! get author image
// export const getAuthorImage = (authorId) => async (dispatch) => {
//   try {
//     const res = await axios.get(`/api/authors/${authorId}/avatar`);
//     // return res.data;
//     dispatch({ type: GET_AUTHOR_IMAGE, payload: res.data });
//   } catch (error) {
//     // return false;
//     handleError(error, dispatch);
//   }
// };
