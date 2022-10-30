const BASE = process.env.REACT_APP_API_BASE_URL;

export const CATEGORIES_API = {
  GET: `${BASE}/fee-assessment-categories`,
}

export const BOOKS_API = {
  GET_BY_CATEGORYID: (categoryId, page, size) => `${BASE}/fee-assessment-books?categoryId=${categoryId}&page=${page}&size=${size}`,
}