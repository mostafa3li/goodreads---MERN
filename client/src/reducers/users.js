import {
  REGISTER_USER,
  ADD_USER_IMAGE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        error: {}
      };

    case REGISTER_USER:
      return {
        ...state,
        user: payload
      };

    case ADD_USER_IMAGE:
      return {
        ...state,
        users:
          state.users &&
          state.users.map((user) =>
            user._id === payload._id ? payload.updatedUser : user
          ),
        user: payload.updatedUser,
        loading: false
      };

    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: payload
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false
      };

    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: {}
      };

    default:
      return state;
  }
}
