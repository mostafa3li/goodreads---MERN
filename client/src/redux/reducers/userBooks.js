import {
  GET_USER_BOOKS,
  ADD_BOOK_SHELVE,
  USER_BOOKS_ERROR,
  CLEAR_USER_BOOKS
} from "../actions/types";

const initialState = {
  userBooks: [],
  userBook: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_BOOKS:
      return { ...state, userBooks: payload, userBook: null, loading: false };

    case ADD_BOOK_SHELVE:
      let newUserBooks = state.userBooks.map((userBook) =>
        userBook.book._id === payload._id
          ? {
              // existed (update)
              ...userBook,
              shelve: payload.updatedUserBook.shelve,
              rating: payload.updatedUserBook.rating
            }
          : userBook
      );
      return {
        ...state,
        userBooks:
          JSON.stringify(state.userBooks) === JSON.stringify(newUserBooks) // no change in userBooks
            ? [...state.userBooks, payload.updatedUserBook] // add new shelve
            : newUserBooks, // update existed shelve
        loading: false
      };

    case USER_BOOKS_ERROR:
      return { ...state, error: payload, loading: false };

    case CLEAR_USER_BOOKS:
      return {
        ...state,
        userBooks: 0,
        userBook: null,
        loading: false
      };

    default:
      return state;
  }
}
