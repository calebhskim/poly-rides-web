import get from 'lodash/get';
import orderBy from 'lodash/orderBy';

import actions from '../constants/actions';
import initialState from '../constants/initialState';

const rides = (state = initialState.data.rides, { payload, response, type }) => {
  switch(type) {
    case actions.CURRENT_RIDES_CHANGE: {
      const { list } = state;
      const loadedRows = {};
      const newride = list.slice(0);

      newride.unshift(payload);
      loadedRows[list.length] = true;
      return Object.assign({}, state, {
        list: orderBy(newride, ['postTimestamp'], ['desc']),
        loadedRowsMap: Object.assign({}, state.loadedRowsMap, loadedRows),
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
