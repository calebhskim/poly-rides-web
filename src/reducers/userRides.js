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
      let userRides;
      if (payload === null) {
        userRides = [];
      } else {
        userRides = Object.keys(payload).map(k => ({
          ...payload[k],
          type: 'ride',
        }));
      }

      return Object.assign({}, state, {
        isRidesLoading: false,
        rides: userRides,
      });
    }
    case actions.USERRIDES_REQUESTS: {
      let requests;
      if (payload === null) {
        requests = [];
      } else {
        requests = Object.keys(payload).map(k => ({
          ...payload[k],
          type: 'request',
        }));
      }

      return Object.assign({}, state, {
        isRequestsLoading: false,
        requests,
      });
    }
    case actions.USERRIDES_DRIVES: {
      let drives;
      if (payload === null) {
        drives = [];
      } else {
        drives = Object.keys(payload).map(k => ({
          ...payload[k],
          type: 'drive',
        }));
      }

      return Object.assign({}, state, {
        isDrivesLoading: false,
        drives,
      });
    }
    default:
      return state;
  }
};

export default rides;
