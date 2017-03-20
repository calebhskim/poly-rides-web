import get from 'lodash/get';
import range from 'lodash/range';

import actions from '../constants/actions';
import initialState from '../constants/initialState';

const rides = (state = initialState.data.rides, { payload, response, type }) => {
  switch(type) {
    case actions.CURRENT_RIDES_CHANGE:
      return Object.assign({}, state, {
        list: payload,
      });
    case actions.FETCH_RIDES_START: {
      const { startIndex, stopIndex } = payload;
      const loadingRows = {};
      range(startIndex, stopIndex + 1).map((index) => {
        loadingRows[index] = false;
        return index;
      });
      return Object.assign({}, state, {
        isNextLoading: true,
        loadedRowsMap: Object.assign(state.loadedRowsMap, loadingRows),
      });
    }
    case actions.FETCH_RIDES_SUCCESS: {
      const { startIndex, stopIndex } = payload;
      const { list } = state;
      const loadedRows = {};
      range(startIndex, stopIndex + 1).map((index) => {
        loadedRows[index] = true;
        return index;
      });

      return Object.assign({}, state, {
        isNextLoading: false,
        list: [...list, ...payload.rides],
        loadedRowsMap: Object.assign({}, state.loadedRowsMap, loadedRows),
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
