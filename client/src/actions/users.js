import axios from "axios";
import M from "materialize-css";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT,
  USER_LOADED,
  CLEAR_CATEGORIES,
  CLEAR_AUTHORS
} from "../actions/types";

// import { setAlert } from "./alert";

// utils
import setAuthToken from "../utils/setAuthToken";

//! Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/users/me");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

//============================================
//! Admin Login
export const adminLogin = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
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
    const errors = error.response.data.errors;
    if (errors) {
      // errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      errors.forEach((error) =>
        M.toast({
          html: error.msg,
          classes: "alert alert-danger rounded"
          // displayLength: 50000
        })
      );
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

//============================================

//! Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_CATEGORIES });
  dispatch({ type: CLEAR_AUTHORS });
};
