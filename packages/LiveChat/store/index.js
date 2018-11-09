import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import currentMember from 'ducks/organization/currentMember';
import conversation from '../ducks/conversations';
import messages from '../ducks/messages';

const loggerMiddleware = createLogger();

const Reducers = combineReducers({
  conversation,
  messages,
  currentMember,
});

export default createStore(
  Reducers,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware, // neat middleware that logs actions
  ),
);
