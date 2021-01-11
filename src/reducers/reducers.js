import {
  SET_BOOK_REQUEST,
  SET_BOOK_SUCCESS,
  SET_BOOK_FAIL,
  SET_ALL_BOOKS_REQUEST,
  SET_ALL_BOOKS_SUCCESS,
  SET_ALL_BOOKS_FAIL,
} from '../constants/constants';

export const setBookReducer = (
  state = { book: 'Genesis', chapters: [], chapter: 1, verse: 1 },
  action
) => {
  switch (action.type) {
    case SET_BOOK_REQUEST:
      return { loading: true, book, chapters };
    case SET_BOOK_SUCCESS:
      return { loading: false, ...action.payload };
    case SET_BOOK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const setBooksReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case SET_ALL_BOOKS_REQUEST:
      return { loading: true, books: [] };
    case SET_ALL_BOOKS_SUCCESS:
      return { loading: false, books: action.payload };
    case SET_ALL_BOOKS_FAIL:
      return { loading: false, error: action.payload, ...state };
    default:
      return state;
  }
};
