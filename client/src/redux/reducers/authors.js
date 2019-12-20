import {
  GET_AUTHORS,
  ADD_AUTHOR,
  EDIT_AUTHOR,
  DELETE_AUTHOR,
  AUTHORS_ERROR,
  CLEAR_AUTHORS,
  ADD_AUTHOR_IMAGE
} from "../actions/types";

const initialState = {
  authors: [],
  author: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_AUTHORS:
      return { ...state, authors: payload, loading: false };

    case ADD_AUTHOR:
      return { ...state, authors: [...state.authors, payload] };

    case ADD_AUTHOR_IMAGE:
      return {
        ...state,
        authors: state.authors.map((author) =>
          author._id === payload._id ? { ...author, hasAvatar: true } : author
        ),
        loading: false
      };

    case EDIT_AUTHOR:
      return {
        ...state,
        authors: state.authors.map((author) =>
          author._id === payload._id ? payload.updatedAuthor : author
        ),
        loading: false
      };

    case DELETE_AUTHOR:
      return {
        ...state,
        authors: state.authors.filter((author) => author._id !== payload),
        loading: false
      };

    case AUTHORS_ERROR:
      return { ...state, error: payload, loading: false };

    case CLEAR_AUTHORS:
      return {
        ...state,
        authors: 0,
        author: null,
        loading: false
      };

    default:
      return state;
  }
}
