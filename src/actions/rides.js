import axios from 'axios';
import values from 'lodash/values';

import actions from '../constants/actions';

const {
  GET_RIDES_COUNT,
  GET_RIDES_COUNT_SUCCESS,
  GET_RIDES_COUNT_FAILURE,
} = actions;

function countRides() {
  return {
    types: {
      request: GET_RIDES_COUNT,
      success: GET_RIDES_COUNT_SUCCESS,
      failure: GET_RIDES_COUNT_FAILURE,
    },
    callAPI: (state) => {
      const { config: { urls: { firebaseDB } } } = state;
      return axios({
        method: 'get',
        baseURL: firebaseDB,
        url: '/rides.json',
        params: {
          shallow: true,
        },
      });
    },
  };
}

function listenForRides() {
  return (dispatch, getState) => {
    const { firebase: { app } } = getState();

    const ridesRef = app.database().ref('rides');
    const displayCount = 10;
    
    // TODO: Update totalCount when this is fired
    ridesRef.orderByChild('postTimestamp').limitToLast(displayCount).on('value', (snap) => {
      dispatch({
        type: actions.CURRENT_RIDES_CHANGE,
        payload: values(snap.val()),
      });
    }, (err) => {
      // TODO: Implement proper error handling
      console.log('err: ', err);
    });
  };
}

function fetchRides({ startIndex, stopIndex }) {
  return (dispatch, getState) => {
    const STATUS_LOADING = 1;
    const STATUS_LOADED = 2;
    const { data: { rides: { list, loadedRowsMap } } } = getState();
    for (let i = startIndex; i <= stopIndex; i += 1) {
      loadedRowsMap[i] = STATUS_LOADING;
    }

    setTimeout(() => {
      for (let i = startIndex; i <= stopIndex; i += 1) {
        loadedRowsMap[i] = STATUS_LOADED;
      }

      dispatch({
        type: actions.CURRENT_RIDES_CHANGE,
        payload: [...list, ...list],
      });
    }, 1000);
  };
}

function stopListenForRides() {
  return (dispatch, getState) => {
    const { firebase: { app } } = getState();

    const ridesRef = app.database().ref('rides');

    ridesRef.off();
  };
}

export { countRides, listenForRides, fetchRides, stopListenForRides };
