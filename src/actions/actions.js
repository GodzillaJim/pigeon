import axios from 'axios'
import {
  SET_BOOK_REQUEST,
  SET_BOOK_SUCCESS,
  SET_BOOK_FAIL, SET_ALL_BOOKS_FAIL, SET_ALL_BOOKS_REQUEST, SET_ALL_BOOKS_SUCCESS
} from '../constants/constants';

export const setBookAction = (book) => (dispatch, getState) => {
  try {
    dispatch({ type: SET_BOOK_REQUEST });
    dispatch({ type: SET_BOOK_SUCCESS, payload: book });
  } catch (error) {
    dispatch({ type: SET_BOOK_FAIL, payload: error.message });
  }
};
export const setBooksActions = async () => (dispatch, getState) => {
  try{
    dispatch({ type: SET_ALL_BOOKS_REQUEST });
    const { data } = await axios.get('/books')
    dispatch({ type: SET_ALL_BOOKS_SUCCESS, payload: data })
  } catch(error){
    dispatch({ type: SET_ALL_BOOKS_FAIL, payload: error.message })
  }
}