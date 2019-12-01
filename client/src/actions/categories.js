import axios from "axios";
import M from "materialize-css";
import {
  GET_CATEGORIES,
  CATEGORIES_ERROR,
  ADD_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY
} from "./types";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
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
    dispatch({
      type: CATEGORIES_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
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
      html: `Category "${res.data.category}" added Successfully`,
      classes: "alert alert-success rounded toast-up"
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) =>
        M.toast({
          html: error.msg,
          classes: "alert alert-danger rounded toast-up"
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
      classes: "alert alert-success rounded toast-up"
    });
  } catch (error) {
    dispatch({
      type: CATEGORIES_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
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
      classes: "alert alert-success rounded toast-up"
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) =>
        M.toast({
          html: error.msg,
          classes: "alert alert-danger rounded toast-up"
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
  }
};
