import { combineReducers } from 'redux';

import rides from './rides';

// Map of data reducers
const reducers = {
  rides,
};

const data = combineReducers(reducers);

export default data;
