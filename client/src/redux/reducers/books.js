import {
  GET_BOOKS,
  ADD_BOOK,
  EDIT_BOOK,
  DELETE_BOOK,
  BOOKS_ERROR,
  CLEAR_BOOKS,
  ADD_BOOK_IMAGE,
  DELETE_RELATED_BOOKS
} from "../actions/types";

const initialState = {
  books: [],
  book: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BOOKS:
      return {
        ...state,
        books: payload,
        loading: false
      };

    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, payload]
      };

    case ADD_BOOK_IMAGE:
      return {
        ...state,
        books: state.books.map((book) =>
          book._id === payload._id ? { ...book, hasPhoto: true } : book
        ),
        loading: false
      };

    case EDIT_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book._id === payload._id ? payload.updatedBook : book
        ),
        loading: false
      };

    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book._id !== payload),
        loading: false
      };

    case DELETE_RELATED_BOOKS:
      const { relation } = payload;
      return {
        ...state,
        books: state.books.filter((book) => book[relation]._id !== payload._id),
        loading: false
      };

    case BOOKS_ERROR:
      return { ...state, error: payload, loading: false };

    case CLEAR_BOOKS:
      return {
        ...state,
        books: 0,
        book: null,
        loading: false
      };

    default:
      return state;
  }
}
