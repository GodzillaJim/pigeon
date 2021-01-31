import {
  SET_BOOK_REQUEST,
  SET_BOOK_SUCCESS,
  SET_BOOK_FAIL,
  SET_ALL_BOOKS_REQUEST,
  SET_ALL_BOOKS_SUCCESS,
  SET_ALL_BOOKS_FAIL,
  SET_CHAPTER_REQUEST,
  SET_CHAPTER_SUCCESS,
  SET_CHAPTER_FAIL,
  SET_VERSE,
  SET_VERSE_ERROR,
  SET_CURRENT_READING_REQUEST,
  SET_CURRENT_READING_SUCCESS,
  SET_CURRENT_READING_FAIL,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
} from '../constants/constants';

export const setCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return { loading: true, categories: [] };
    case GET_CATEGORIES_SUCCESS:
      return { loading: false, categories: action.payload };
    case GET_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const setVerseReducer = (
  state = { book: 'Genesis', chapter: 1, verse: 1 },
  action
) => {
  switch (action.type) {
    case SET_VERSE:
      return { ...action.payload };
    case SET_VERSE_ERROR:
      return { ...action.payload };
    default:
      return state;
  }
};
export const setBookReducer = (
  state = { book: '', chapters: [], chapter: 1, verse: 1 },
  action
) => {
  switch (action.type) {
    case SET_BOOK_REQUEST:
      return { loading: true, book: '', chapters: [] };
    case SET_BOOK_SUCCESS:
      const { chapters, book } = action.payload;
      return { loading: false, chapters, book };
    case SET_BOOK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const setReadingReducer = (
  state = { text: '', currentVerse: 1, finalVerse: 10, page: [] },
  action
) => {
  switch (action.type) {
    case SET_CURRENT_READING_REQUEST:
      return { loading: true };
    case SET_CURRENT_READING_SUCCESS:
      const { text, currentVerse, finalVerse, page } = action.payload;
      return { loading: false, text, currentVerse, finalVerse, page };
    case SET_CURRENT_READING_FAIL:
      return { error: action.payload, loading: false };
    default:
      return state;
  }
};
export const setChapterReducer = (
  state = { book: '', chapter: '', verses: [] },
  action
) => {
  switch (action.type) {
    case SET_CHAPTER_REQUEST:
      return {
        verses: [],
        loading: true,
        book: action.payload.book,
        chapter: action.payload.chapter,
      };
    case SET_CHAPTER_SUCCESS:
      const { book, chapter, verses } = action.payload;
      return {
        loading: false,
        verses,
        book,
        chapter,
      };
    case SET_CHAPTER_FAIL:
      return {
        loading: false,
        erorr: action.payload,
      };
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
