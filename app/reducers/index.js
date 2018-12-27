// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import token from './token';
import holdFor from './holdfor';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    token,
    holdFor
  });
}
