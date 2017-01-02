import { combineReducers } from 'redux';
import auth from './auth';
import config from './config';
import firebase from './firebase';

// Map of reducers to pass to store
const reducers = {
  auth,
  config,
  firebase,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
