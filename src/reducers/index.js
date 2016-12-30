import { combineReducers } from 'redux';
import config from './config';

// Map of reducers to pass to store
const reducers = {
  config,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
