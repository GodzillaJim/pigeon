import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  setBookReducer,
  setBooksReducer,
  setChapterReducer,
  setVerseReducer,
  setReadingReducer,
  setCategoriesReducer,
  searchVerseReducer,
} from './reducers/reducers';

const reducer = combineReducers({
  setBook: setBookReducer,
  setBooks: setBooksReducer,
  setChapter: setChapterReducer,
  setVerse: setVerseReducer,
  setReading: setReadingReducer,
  setCategories: setCategoriesReducer,
  searchVerse: searchVerseReducer,
});

const initialState = {
  setBooks: { books: [] },
  setBook: { book: 'Genesis', chapters: [], chapter: 1, verse: 1 },
  setChapter: { book: 'Genesis', chapter: 1, verses: [] },
  setVerse: { book: 'Genesis', chapter: 1, verse: 1 },
};
const middleWare = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);
export default store;
