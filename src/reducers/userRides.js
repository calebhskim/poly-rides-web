import values from 'lodash/values';

import actions from '../constants/actions';
import initialState from '../constants/initialState';

const rides = (state = initialState.data.userRides, { payload, type }) => {
  switch(type) {
    case actions.FETCH_USERRIDES_START:
      return Object.assign({}, state, {
        isDrivingLoading: true,
        isRidesLoading: true,
        isRequestsLoading: true,
      });
    case actions.USERRIDES_RIDES: {
      return Object.assign({}, state, {
        isRidesLoading: false,
        rides: values(payload),
      });
    }
    case actions.USERRIDES_REQUESTS:
      return Object.assign({}, state, {
        isRequestsLoading: false,
        requests: values(payload),
      });
    case actions.USERRIDES_DRIVES:
      return Object.assign({}, state, {
        drives: values(payload),
        isDrivesLoading: false,
      });
    default:
      return state;
  }
};

export default rides;
