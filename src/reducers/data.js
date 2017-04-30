import { combineReducers } from 'redux';

import rides from './rides';
import userRides from './userRides';

// Map of data reducers
const reducers = {
  rides,
  userRides,
};

const data = combineReducers(reducers);

export default data;
