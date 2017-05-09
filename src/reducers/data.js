import { combineReducers } from 'redux';

import rides from './rides';
import userRidesData from './userRidesData';

// Map of data reducers
const reducers = {
  rides,
  userRidesData,
};

const data = combineReducers(reducers);

export default data;
