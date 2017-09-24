import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import user from './user';
import market from './market';
import inventory from './inventory';

const reducer = combineReducers({
  user,
  market,
  inventory
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger()
  ))
);

export default store;

export * from './user';
export * from './market';
export * from './inventory';
