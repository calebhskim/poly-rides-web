import get from 'lodash/get';
import values from 'lodash/values';

import actions from '../constants/actions';
import initialState from '../constants/initialState';

const rides = (state = initialState.data.rides, { payload, response, type }) => {
  switch(type) {
    case actions.CURRENT_RIDES_CHANGE: {
      const rideList = values(payload);

      for (let i = 0; i < rideList.length; i += 1) {
        rideList[i].source = 'polyrides';
      }

      return Object.assign({}, state, {
        list: rideList,
      });
    }
    case actions.FB_RIDES_CHANGE: {
      const postList = [];
      const keys = Object.keys(payload);

      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const value = payload[key];

        value.source = 'FB';
        value.rideId = key;

        postList.push(value);
      }

      return Object.assign({}, state, {
        fblist: postList,
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
    // case actions.POST_RIDE_START: {
    // }
    // case actions.POST_RIDE_SUCCESS: {
    // }
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
