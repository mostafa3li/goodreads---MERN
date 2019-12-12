import {
  GET_CATEGORIES,
  CATEGORIES_ERROR,
  ADD_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  CLEAR_CATEGORIES
} from "../actions/types";

const initialState = {
  categories: [],
  category: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORIES:
      return { ...state, categories: payload, loading: false };

    case CATEGORIES_ERROR:
      return { ...state, error: payload, loading: false };

    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, payload],
        loading: false
      };

    case EDIT_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === payload._id
            ? { ...category, category: payload.updatedCategory.category }
            : category
        ),
        loading: false
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== payload
        ),
        loading: false
      };

    case CLEAR_CATEGORIES:
      return {
        ...state,
        categories: [],
        category: null,
        loading: false
      };

    default:
      return state;
  }
}
