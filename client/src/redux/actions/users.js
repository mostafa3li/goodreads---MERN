import axios from "axios";
import M from "materialize-css";
import {
  REGISTER_USER,
  ADD_USER_IMAGE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  CLEAR_CATEGORIES,
  CLEAR_AUTHORS,
  CLEAR_BOOKS,
  LOGOUT
} from "../actions/types";

// utils
import setAuthToken from "../../utils/setAuthToken";

//============================================

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

const handleError = (error, dispatch, login = false) => {
  const errors = error.response.data.errors;
  if (errors) {
    errors.forEach((error) =>
      M.toast({
        html: error.msg,
        classes: "alert alert-danger rounded",
        displayLength: 50000
      })
    );
  }

  login
    ? dispatch({
        type: LOGIN_FAIL,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      })
    : dispatch({
        type: AUTH_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
};

//============================================

//! Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/users/me");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};

//============================================

//! Admin Login
export const adminLogin = (email, password) => async (dispatch) => {
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/adminAuth/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
    M.toast({
      html: `Welcome back "${res.data.user.name}"`,
      classes: "alert text-white rounded lead bg-success"
    });
  } catch (error) {
    handleError(error, dispatch, true);
  }
};

//============================================

//! add user image
export const addUserImage = (_id, userImage) => async (dispatch) => {
  try {
    let body = new FormData();
    body.append("avatar", userImage);
    const imageConfig = { "content-type": "multipart/form-data" };
    const res = await axios.post(
      `/api/users/addAvatar/${_id}`,
      body,
      imageConfig
    );

    //! for adding an image while registering, no need for dispatching any action
    dispatch({
      type: ADD_USER_IMAGE,
      payload: { _id, updatedUser: res.data }
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};

//============================================

//! User Register
export const userRegister = (userData, userImage) => async (dispatch) => {
  const { fName, lName, email, password } = userData;
  const body = JSON.stringify({ name: `${fName} ${lName}`, email, password });
  try {
    const res = await axios.post("/api/users/register", body, config);
    dispatch({
      type: REGISTER_USER,
      payload: res.data
    });
    if (userImage) {
      dispatch(addUserImage(res.data._id, userImage));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};

//============================================

//! User Login
export const userLogin = (userData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/users/login", userData, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    handleError(error, dispatch, true);
  }
};

//============================================

//! Logout
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_CATEGORIES });
  dispatch({ type: CLEAR_AUTHORS });
  dispatch({ type: CLEAR_BOOKS });
  dispatch({ type: LOGOUT });
};
