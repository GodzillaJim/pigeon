import axios from 'axios';
import {
  SET_BOOK_REQUEST,
  SET_BOOK_SUCCESS,
  SET_BOOK_FAIL,
  SET_ALL_BOOKS_FAIL,
  SET_ALL_BOOKS_REQUEST,
  SET_ALL_BOOKS_SUCCESS,
  SET_CHAPTER_REQUEST,
  SET_CHAPTER_SUCCESS,
  SET_CHAPTER_FAIL,
  SET_VERSE,
  SET_VERSE_ERROR,
  SET_CURRENT_READING_REQUEST,
  SET_CURRENT_READING_SUCCESS,
  SET_CURRENT_READING_FAIL,
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_REQUEST,
} from '../constants/constants';
export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORIES_REQUEST });
    const { data } = await axios.get('/categories');
    dispatch({ type: GET_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_CATEGORIES_FAIL, payload: error });
  }
};
export const setTextAction = (verse) => async (dispatch) => {
  try {
    dispatch({ type: SET_CURRENT_READING_REQUEST });
    const { data } = await axios.get(
      `/books/${verse.book}/${verse.chapter}/${verse.verse}`
    );
    if (data.status) {
      dispatch({ type: SET_CURRENT_READING_FAIL, payload: data });
      return;
    }
    dispatch({ type: SET_CURRENT_READING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_CURRENT_READING_FAIL, payload: error.data || error });
  }
};
export const setVerseAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_VERSE, payload: data });
  } catch (error) {
    dispatch({ type: SET_VERSE_ERROR, payload: error });
  }
};
export const setBookAction = (book) => async (dispatch) => {
  try {
    dispatch({ type: SET_BOOK_REQUEST });
    const { data } = await axios.get(`/books/${book}`);
    dispatch({ type: SET_BOOK_SUCCESS, payload: { book, chapters: data } });
  } catch (error) {
    dispatch({ type: SET_BOOK_FAIL, payload: error.message });
  }
};
export const setChapterAction = (payload) => async (dispatch) => {
  try {
    dispatch({ type: SET_CHAPTER_REQUEST, payload });
    const { book, chapter } = payload;
    const { data } = await axios.get(`/books/${book}/${chapter}`);
    dispatch({
      type: SET_CHAPTER_SUCCESS,
      payload: { ...payload, verses: data },
    });
  } catch (error) {
    dispatch({ type: SET_CHAPTER_FAIL, payload: error.message });
  }
};
export const setBooksAction = () => async (dispatch) => {
  try {
    dispatch({ type: SET_ALL_BOOKS_REQUEST });
    const { data } = await axios.get('/books');
    dispatch({ type: SET_ALL_BOOKS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_ALL_BOOKS_FAIL, payload: error.message });
  }
};
