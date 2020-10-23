import currentContact from 'ducks/organization/currentContact';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import conversation from '../ducks/conversations';

const loggerMiddleware = createLogger();

const Reducers = combineReducers({
  conversation,
  currentContact,
});

export default createStore(
  Reducers,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware, // neat middleware that logs actions
  ),
);
