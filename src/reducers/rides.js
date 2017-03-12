import actions from '../constants/actions';
import initialState from '../constants/initialState';

const rides = (state = initialState.data.rides, { payload, type }) => {
  switch(type) {
    case actions.CURRENT_RIDES_CHANGE:
      return Object.assign({}, state, {
        list: payload,
      });
    default:
      return state;
  }
};

export default rides;
