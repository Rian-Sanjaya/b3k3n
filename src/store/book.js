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

    case UPDATE_FAVOURITE:
      return {
        ...state,
        books: action.payload,
      }

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

export const updateFavourite = (books) => ({
  type: UPDATE_FAVOURITE,
  payload: books,
})

export function fetchBooks(categoryId, page = 0, size = 10) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(setLoading(true));
      getAPI(BOOKS_API.GET_BY_CATEGORYID(categoryId, page, size))
        .then(res => {
          // add state books data with favorite
          const favourite = JSON.parse(localStorage.getItem("b3k3nFav"));
          let booksWithFavourite;
          if (favourite) {
            // if the book is already in favorite local storage
            // set the favorite to true else set to false
            booksWithFavourite = res.data.map(book => {
              const found = favourite.find(fav => fav.id === book.id);
              if (found) return { ...book, favourite: true };
              else return { ...book, favourite: false };
            });
          } else {
            // if no local storage set all favorite to false
            booksWithFavourite = res.data.map(book => (
              { ...book, favourite: false }
            ))
          }
          dispatch(booksFetch(booksWithFavourite))
          dispatch(setLoading(false));
          resolve(booksWithFavourite);
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

// toggle the favorite in data state movies
export function onUpdateFavourite(curBook) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      const state = getState();
      const books = state.book.books;
      const updbooks = books.map(book => {
        if (book.id === curBook.id) {
          return { ...book, favourite: !curBook.favourite }
        }

        return book;
      });
      dispatch(updateFavourite(updbooks));
      resolve(updbooks);
    });
  };
}

// action types
export const BOOKS_FETCH = "book/booksFetch";
export const SET_LOADING = "book/setLoading";
export const UPDATE_FAVOURITE = 'book/updateFavourite';