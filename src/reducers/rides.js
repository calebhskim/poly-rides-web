import get from 'lodash/get';
import orderBy from 'lodash/orderBy';

import actions from '../constants/actions';
import initialState from '../constants/initialState';

const rides = (state = initialState.data.rides, { payload, response, type }) => {
  switch(type) {
    case actions.CURRENT_RIDES_CHANGE: {
      const { isPosting, list } = state;
      const loadedRows = {};
      const clickedRows = {};
      const newride = isPosting === payload.driver ? list.slice(1) : list.slice(0);
      const index = isPosting === payload.driver ? 0 : list.length;

      newride.unshift(payload);
      loadedRows[index] = true;
      clickedRows[index] = false;
      return Object.assign({}, state, {
        list: orderBy(newride, ['postTimestamp'], ['desc']),
        loadedRowsMap: Object.assign({}, state.loadedRowsMap, loadedRows),
        clickedRowsMap: Object.assign({}, state.clickedRowsMap, clickedRows),
      });
    }
    case actions.CHANGE_ROW_HEIGHT: {
      const clickedRows = {};
      clickedRows[payload] = !state.clickedRowsMap[payload];
      return Object.assign({}, state, {
        clickedRowsMap: Object.assign({}, state.clickedRowsMap, clickedRows),
      });
    }
    case actions.GET_RIDES_COUNT_SUCCESS: {
      const data = get(response, 'data', {});
      return Object.assign({}, state, {
        totalCount: Object.keys(data).length,
      });
    }
    // TODO: Handle GET_RIDES_COUNT_FAILURE
    case actions.POST_RIDE_START: {
      const { list } = state;
      const loadedRows = {};
      const newride = list.slice(0);

      newride.unshift({
        loading: payload,
      });
      loadedRows[list.length] = true;
      loadedRows[0] = false;
      return Object.assign({}, state, {
        isPosting: payload,
        list: newride,
        loadedRowsMap: Object.assign({}, state.loadedRowsMap, loadedRows),
      });
    }
    case actions.POST_RIDE_SUCCESS: {
      const { list } = state;
      const newlist = list.slice(1);

      return Object.assign({}, state, {
        isPosting: '',
        list: newlist,
      });
    }
    default:
      return state;
  }
};

export default rides;
