import { combineReducers } from 'redux';

import posts from './posts';

// Map of data reducers
const reducers = {
  posts,
};

const data = combineReducers(reducers);

export default data;
