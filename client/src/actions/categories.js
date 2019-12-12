import axios from "axios";
import M from "materialize-css";

import {
  GET_CATEGORIES,
  CATEGORIES_ERROR,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY
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
    type: CATEGORIES_ERROR,
    payload: {
      msg: error.response.statusText,
      status: error.response.status
    }
  });
};

//! get all categories
export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/categories");
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};

//! add category
export const addCategory = (category) => async (dispatch) => {
  const body = JSON.stringify({ category });
  try {
    const res = await axios.post("/adminCategories/add", body, config);
    dispatch({
      type: ADD_CATEGORY,
      payload: res.data
    });
    M.toast({
      html: `Category "${res.data.category}" has been Added Successfully`,
      classes: "alert bg-success text-white rounded"
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};

//! delete category
export const deleteCategory = (_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/adminCategories/delete/${_id}`);
    dispatch({
      type: DELETE_CATEGORY,
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

//! edit category
export const editCategory = (categoryData) => async (dispatch) => {
  const { _id, categoryName } = categoryData;
  const body = JSON.stringify({ category: categoryName });
  try {
    const res = await axios.patch(`/adminCategories/edit/${_id}`, body, config);

    dispatch({
      type: EDIT_CATEGORY,
      payload: { _id, updatedCategory: res.data }
    });
    M.toast({
      html: "Category Updated Successfully",
      classes: "alert bg-success text-white rounded"
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};
