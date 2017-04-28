import get from 'lodash/get';
import orderBy from 'lodash/orderBy';

import actions from '../constants/actions';
import initialState from '../constants/initialState';

const rides = (state = initialState.data.rides, { payload, response, type }) => {
  switch(type) {
    case actions.CURRENT_RIDES_CHANGE: {
      const { isPosting, list } = state;
      const loadedRows = {};
      const newride = isPosting === payload.driver ? list.slice(1) : list.slice(0);

      newride.unshift(payload);
      loadedRows[isPosting === payload.driver ? 0 : list.length] = true;
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
    case actions.POST_RIDE_SUCCESS:
      return Object.assign({}, state, {
        isPosting: '',
      });
    case actions.RIDES_SEARCH_START: {
      return Object.assign({}, state, {
        isLoading: true,
        isSearching: true,
      });
    }
    case actions.RIDES_SEARCH_RESULTS: {
      const { searchResults } = payload;
      return Object.assign({}, state, {
        searchResults,
        isLoading: false,
        isSearching: true,
      });
    }
    case actions.RIDES_SEARCH_STOP:
      return Object.assign({}, state, {
        isLoading: false,
        isSearching: false,
      });
    default:
      return state;
  }
};

export default rides;
