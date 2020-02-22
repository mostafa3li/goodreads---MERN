import axios from "axios";
import M from "materialize-css";

import {
  GET_CATEGORIES,
  GET_CATEGORY,
  CATEGORIES_ERROR,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  DELETE_RELATED_BOOKS,
  CLEAR_CATEGORY,
  GET_ALL_CATEGORIES
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
    type: CATEGORIES_ERROR,
    payload: {
      msg: error.response.statusText,
      status: error.response.status
    }
  });
};

//============================================

//! get all categories
export const getAllCategories = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/categories`);
    dispatch({
      type: GET_ALL_CATEGORIES,
      payload: res.data
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};
//============================================

//! get current categories (paginated)
export const getCategories = (
  params = { limit: 0, skip: 0, sortBy: "category" }
) => async (dispatch) => {
  const { limit, skip, sortBy } = params;
  try {
    const res = await axios.get(
      `/api/categories?limit=${limit}&skip=${skip}&sortBy=${sortBy}:asc`
    );
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};

//============================================

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

//============================================

//! delete category
export const deleteCategory = (_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/adminCategories/delete/${_id}`);
    dispatch({
      type: DELETE_CATEGORY,
      payload: _id
    });
    dispatch({
      type: DELETE_RELATED_BOOKS,
      payload: { relation: "category", _id }
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

//============================================

//! Get category by id
export const getCategory = (_id) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_CATEGORY });
    const res = await axios.get(`/api/categories/${_id}`);
    dispatch({
      type: GET_CATEGORY,
      payload: res.data
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};
