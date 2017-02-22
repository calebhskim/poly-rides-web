import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import appState from './appState';
import auth from './auth';
import config from './config';
import firebase from './firebase';

// Map of reducers to pass to store
const reducers = {
  appState,
  auth,
  config,
  firebase,
  routing: routerReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
