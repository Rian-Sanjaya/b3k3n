import { getAPI } from "../api/api-methods";
import { CATEGORIES_API } from "../api/api-url";

const initialState = {
  categories: [],
  loading: false,
};

export function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORIES_FETCH:
      return {
        ...state,
        categories: action.payload,
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
export const getCategories = (state) => state.category.categories;
export const getLoading = (state) => state.category.loading;

// action creators
export const categoriesFetch = (categories) => ({
  type: CATEGORIES_FETCH,
  payload: categories,
});

export const setLoading = (val) => ({
  type: SET_LOADING,
  payload: val,
});

export function fetchCategories() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(setLoading(true));
      getAPI(CATEGORIES_API.GET)
        .then(res => {
          dispatch(categoriesFetch(res.data))
          dispatch(setLoading(false));
          resolve();
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
export const CATEGORIES_FETCH = "category/categoriesFetch";
export const SET_LOADING = "category/setLoading";