import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { setBookReducer, setBooksReducer } from './reducers/reducers';

const reducer = combineReducers({
  setBook: setBookReducer,
  setBooks: setBooksReducer,
});

const initialState = {};
const middleWare = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);
export default store;
