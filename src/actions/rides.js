import axios from 'axios';
import values from 'lodash/values';
import orderBy from 'lodash/orderBy';

import actions from '../constants/actions';

const {
  CURRENT_RIDES_CHANGE,
  FETCH_RIDES_START,
  FETCH_RIDES_SUCCESS,
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
    const {
      firebase: { app },
      data: { rides: { displayCount } },
    } = getState();

    const ridesRef = app.database().ref('rides');

    // TODO: Update totalCount when this is fired
    ridesRef.orderByChild('postTimestamp').limitToLast(displayCount).on('value', (snap) => {
      dispatch({
        type: CURRENT_RIDES_CHANGE,
        payload: values(snap.val()),
      });
    }, (err) => {
      // TODO: Implement proper error handling
      console.log('err: ', err);
    });
  };
}

// const STATUS_LOADING = 1;
// const STATUS_LOADED = 2;
// const { data: { rides: { list, loadedRowsMap } } } = getState();
// for (let i = startIndex; i <= stopIndex; i += 1) {
//   loadedRowsMap[i] = STATUS_LOADING;
// }
//
// setTimeout(() => {
//   for (let i = startIndex; i <= stopIndex; i += 1) {
//     loadedRowsMap[i] = STATUS_LOADED;
//   }
//
//   dispatch({
//     type: actions.CURRENT_RIDES_CHANGE,
//     payload: [...list, ...list],
//   });
// }, 1000);

function fetchRides() {
  console.log('CALLED');
  return (dispatch, getState) => {
    const {
      firebase: { app },
      data: { rides: { displayCount, startFrom: { key, timestamp } } },
    } = getState();
    let ridesRef = app.database().ref('rides').orderByChild('postTimestamp').limitToFirst(displayCount);

    dispatch({
      type: FETCH_RIDES_START,
    });

    // We've already loaded rides
    if (key) {
      ridesRef = ridesRef.startAt(timestamp, key);
    }

    ridesRef.once('value').then((snapshot) => {
      const data = snapshot.val();
      const rides = Object.keys(data).map(k => ({
        ...data[k],
        k,
      }));
      const sorted = orderBy(rides, ['postTimestamp'], ['desc']);
      const last = sorted[sorted.length - 1];
      dispatch({
        type: FETCH_RIDES_SUCCESS,
        payload: {
          last: {
            key: last.key,
            timestamp: last.timestamp,
          },
          rides: sorted.slice(0, -1),
        },
      });
    });
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
