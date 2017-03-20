import get from 'lodash/get';

import actions from '../constants/actions';
import initialState from '../constants/initialState';

const rides = (state = initialState.data.rides, { payload, response, type }) => {
  switch(type) {
    case actions.CURRENT_RIDES_CHANGE:
      return Object.assign({}, state, {
        list: payload,
      });
    case actions.FETCH_RIDES_START: {
      return Object.assign({}, state, {
        isNextLoading: true,
      });
    }
    case actions.FETCH_RIDES_SUCCESS: {
      const { list } = state;
      return Object.assign({}, state, {
        isNextLoading: false,
        list: [...list, ...payload.rides],
        startFrom: { ...payload.last },
      });
    }
    case actions.GET_RIDES_COUNT_SUCCESS: {
      const data = get(response, 'data', {});
      return Object.assign({}, state, {
        totalCount: Object.keys(data).length,
      });
    }
    // TODO: Handle GET_RIDES_COUNT_FAILURE
    default:
      return state;
  }
};

export default rides;
