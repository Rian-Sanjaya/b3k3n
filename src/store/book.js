import { getAPI } from "../api/api-methods";
import { BOOKS_API } from "../api/api-url";

const initialState = {
  books: [],
  loading: false,
};

export function bookReducer(state = initialState, action) {
  switch (action.type) {
    case BOOKS_FETCH:
      return {
        ...state,
        books: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
}

// selectors
export const getBooks = (state) => state.book.books;
export const getLoading = (state) => state.book.loading;

// action creators
export const booksFetch = (books) => ({
  type: BOOKS_FETCH,
  payload: books,
});

export const setLoading = (val) => ({
  type: SET_LOADING,
  payload: val,
});

export function fetchBooks(categoryId, page = 0, size = 10) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(setLoading(true));
      getAPI(BOOKS_API.GET_BY_CATEGORYID(categoryId, page, size))
        .then(res => {
          dispatch(booksFetch(res.data))
          dispatch(setLoading(false));
          resolve(res.data);
        })
        .catch(err => {
          console.log("error: ", err.message);
          console.log("error: ", err.response);
          dispatch(setLoading(false));
          reject(err);
        })
    })
  }
}

// action types
export const BOOKS_FETCH = "book/booksFetch";
export const SET_LOADING = "book/setLoading";